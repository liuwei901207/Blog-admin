'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // cookie appKey 配置选项
  config.keys = appInfo.name + '_1534143697660_2333'

  // cors 配置选项
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  // csrf 配置选项 - 做为 API server 关闭此安全防范
  config.security = {
    csrf: {
      ignore: () => true,
    },
  }

  // mysql 配置选项
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'my-blog',
    host: 'localhost',
    port: '43306',
    username: 'root',
    password: '123456',
  }

  // graphql 配置选项
  exports.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // graphQL 路由前的拦截器
    onPreGraphQL: function * (ctx) {},
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    onPreGraphiQL: function * (ctx) {},
  }

  // jsonLimit 配置选项
  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb',
  }

  // 全局中间件加载
  config.middleware = ['graphqlAuth', 'graphql']

  return config
}
