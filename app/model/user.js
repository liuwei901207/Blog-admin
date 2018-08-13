'use strict'

// app/model/user.js

const crypto = require('crypto')

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const User = app.model.define('user', {
    account: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: STRING(32),
      unique: false,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: STRING,
      unique: true,
      allowNull: true,
      defaultValue: null,
    },
    cell_phone: {
      type: STRING(11),
      unique: true,
      allowNull: true,
      defaultValue: null,
    },
    password: {
      type: STRING(32),
      allowNull: false,
    },
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
