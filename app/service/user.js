'use strict'

const Service = require('egg').Service
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

class UserService extends Service {

  /**
   * 带分页、排序参数查询文章列表信息
   * @param {number} offset - 分页参数
   * @param {number} limit - 分页参数
   * @param {string} order_by - 排序参数
   * @param {string} order - 排序参数
   * @return {Promise<*>} - 返回promise
   */
  async list ({offset = 0, limit = 10, order_by = 'created_at', order = 'ASC', search}) {
    offset = Number(offset)
    limit = Number(limit)
    let option = {}
    if (search) {
      option = {
        where: {
          name: {
            [this.ctx.model.Op.like]: `%${search}%`,
          },
        },
        offset,
        limit,
        order: [[order_by, order.toUpperCase()]],
      }
    } else {
      option = {
        offset,
        limit,
        order: [[order_by, order.toUpperCase()]],
      }
    }

    const result = await this.ctx.model.User.findAndCountAll(option)

    return {
      total: result.count,
      rows: result.rows,
    }
  }

  /**
   * 带id查询一条用户信息
   * @param {number} userID_or_userAccount - 用户ID或者用户username
   * @return {Promise<*>} - 返回promise
   */
  async getUserByIdOrAccount (userID_or_userAccount) {
    const user = await this.ctx.model.User.findOne({
      where: {
        $or: [
          {
            id:
              {
                $eq: userID_or_userAccount,
              },
          },
          {
            username:
              {
                $eq: userID_or_userAccount,
              },
          },
        ],
      },
    }, {
      attributes: {exclude: ['password']},
    })
    if (!user) {
      return null
    }
    return user
  }

  /**
   * 创建一条新用户信息
   * @param {object} user - 用户数据
   * @return {Promise<user>} - 返回promise
   */
  async create (user) {
    console.log(user)
    return this.ctx.model.User.create(user)
  }

  /**
   * 带id更新一条用户信息
   * @param {number} id - 用户ID
   * @param {object} updates - 用户更新数据
   * @return {Promise<Promise<*>|IDBRequest|Promise<void>|void>} - 返回promise
   */
  async update ({id, updates}) {
    const user = await this.ctx.model.User.findById(id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user.update(updates)
  }

  /**
   * 带id删除一条用户信息
   * @param {number} id - 用户ID
   * @return {Promise<*>} - 返回promise
   */
  async del (id) {
    const user = await this.ctx.model.User.findById(id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user.destroy()
  }

  /**
   * 用户登录
   * @param {string} name - 账户
   * @param {string} password - 密码
   * @return {Promise<*>} - 返回promise
   */
  async userLogin ({username, password, rememberMe}) {
    const ctx = this.ctx
    const md5 = crypto.createHash('md5')
    const IP = ctx.ip
    let BlogSysLog = {status: 'info', IP, content: ''}
    password = md5.update(password).digest('hex')
    const user = await this.ctx.model.User.findOne({
      attributes: {exclude: ['password']}, // 不包含密码字段
      where: {
        username,
        password,
      },
    })
    if (!user) {
      BlogSysLog.status = 'error'
      BlogSysLog.content = `用户账号:${username} 尝试登录管理后台失败`
      return ctx.throw(401, {message: '登陆失败, 用户名或密码错误!'})
    }

    BlogSysLog.status = 'info'
    BlogSysLog.content = `用户账号:${username} 登录成功`
    const token = jwt.sign({uid: user.id}, ctx.app.config.keys, {
      expiresIn: rememberMe ? '7d' : '2h',
    })
    user.update({last_sign_in_at: new Date()}) // 添加登录时间
    ctx.model.BlogSysLog.create(BlogSysLog) // 保存用户登录记录
    await ctx.app.redis.set(user.id, user.token, 'PX', rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000) // 默认为2 小时， 记住我为7 天
    return {user, token}
  }

  /**
   * 用户登出
   * @returns {Promise<{user: null, token: null}>}
   */
  async userLogout () {
    const ctx = this.ctx
    const IP = ctx.ip
    const tokenUid = ctx.session.tokenUid
    await ctx.app.redis.del(tokenUid)
    const BlogSysLog = {status: 'info', IP, content: `登出系统成功, userId: ${tokenUid} 已注销`}
    ctx.model.BlogSysLog.create(BlogSysLog) // 保存用户登出记录
    return {user: null, token: null}
  }

  async changePass ({password, new_password, re_password}) {
    const ctx = this.ctx
    const username = this.ctx.session.user.username
    if (new_password !== re_password) {
      ctx.throw(422, 're_password is not equal to new_password')
    }
    password = crypto.createHash('md5').update(password).digest('hex')
    new_password = crypto.createHash('md5').update(new_password).digest('hex')
    const update = await this.ctx.model.User.update({
      password: new_password,
    }, {
      where: {
        username,
        password,
      },
    })

    if (update[0] === 0) {
      ctx.throw(422, 'change password failed')
    }

    ctx.session.user = null

    return update
  }

}

module.exports = UserService
