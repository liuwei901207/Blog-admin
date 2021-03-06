'use strict'

const crypto = require('crypto')

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const User = app.model.define('user', {
    // 管理员登录账号
    username: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    // 管理员名称
    name: {
      type: STRING(32),
      unique: false,
      allowNull: true,
      defaultValue: null,
    },
    // 管理员Email
    email: {
      type: STRING,
      unique: true,
      allowNull: true,
      defaultValue: null,
    },
    // 管理员手机
    cell_phone: {
      type: STRING(11),
      unique: true,
      allowNull: true,
      defaultValue: null,
    },
    // 登录密码
    password: {
      type: STRING(32),
      allowNull: false,
    },
    // 上一次登录时间
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  })

  User.hook('beforeCreate', function (user) {
    const md5 = crypto.createHash('md5')
    user.password = md5.update(user.password).digest('hex')
  })

  User.hook('beforeUpdate', function (user) {
    if (user.password) {
      const md5 = crypto.createHash('md5')
      user.password = md5.update(user.password).digest('hex')
    }
  })

  return User
}
