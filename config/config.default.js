'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // cookie appKey 设置
  config.keys = appInfo.name + '_1534143697660_2333'

  // 全局中间件加载
  config.middleware = []

  // mysql 配置选项
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'my-blog',
    host: 'localhost',
    port: '43306',
    username: 'root',
    password: '123456',
  }

  return config
}
