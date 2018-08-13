'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534143697660_2333'

  // add your config here
  config.middleware = []

  // mysql
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
