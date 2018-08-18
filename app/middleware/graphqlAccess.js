'use strict'

const jwt = require('jsonwebtoken')

module.exports = options => {
  return async function graphqlAccess (ctx, next) {
    // 开启 GraphiQL IDE 调试时，所有的请求放过
    if (ctx.app.config.graphql.graphiql) {
      await next()
      return
    }

    // 非登录接口，需要验证登录权限
    if (ctx.request.body.variables.mutationName !== 'login') {
      let token = ctx.request.header['authorization']
      if (token === undefined) {
        ctx.body = {message: '令牌为空，请登陆获取！'}
        ctx.status = 401
        return
      }
      token = token.replace(/^Bearer\s/, '')
      try {
        let decoded = jwt.verify(token, ctx.app.config.keys)
        // iat => 签发时间 秒, exp= > 过期时间 秒
        if (Date.now() / 1000 > decoded.exp) {
          ctx.body = {message: '令牌已过期，请重新登陆获取！'}
          ctx.status = 401
          return
        }
        // 非登录接口，登录权限验证通过
        ctx.session.tokenUid = decoded.uid
        await next()
      } catch (err) {
        ctx.body = {message: '访问令牌鉴权无效，请重新登陆获取！'}
        ctx.status = 401
      }
    }
    // 登录接口，不需要验证登录权限，就可以访问
    else {
      await next()
    }
  }
}