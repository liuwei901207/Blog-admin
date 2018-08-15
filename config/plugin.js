'use strict'

// mysql 连接插件
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
}

// graphql 连接插件
exports.graphql = {
  enable: true,
  package: 'egg-graphql',
}

// 开启跨域访问
exports.cors = {
  enable: true,
  package: 'egg-cors',
}

// redis 连接插件
exports.redis = {
  enable: true,
  package: 'egg-redis',
}

// sessionRedis 连接插件
exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
}