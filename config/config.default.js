'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // 日志 配置选项
  config.logger = {
    level: 'INFO',
    allowDebugAtProd: false,
  }

  // cookie && token appKey 配置选项
  config.keys = 'ryx4YwRg5omCs7Yb'

  // session 配置选项
  config.session = {
    key: 'EGG_SESS',
    maxAge: 2 * 3600 * 1000, // 2 小时
    httpOnly: true,
    encrypt: true,
  }

  // redis 配置选项
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: 'homestead',
      db: 0,
    },
  }

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
    graphiql: false,
  }

  // jsonLimit 配置选项
  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb',
  }

  // 全局中间件加载
  config.middleware = ['graphqlAccess', 'graphql']

  config.graphqlAccess = {
    match: '/graphql',
  }

  return config
}
