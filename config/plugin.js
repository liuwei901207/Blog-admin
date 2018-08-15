'use strict'

// mysql连接插件
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
}

// graphql连接插件
exports.graphql = {
  enable: true,
  package: 'egg-graphql',
}

// 开启跨域访问
exports.cors = {
  enable: true,
  package: 'egg-cors',
}