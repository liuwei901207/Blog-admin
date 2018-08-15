'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const UserLoginRecord = app.model.define('user_login_record', {
    IP: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    country: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    province: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    city: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    equipment: {
      type: STRING,
      allowNull: true,
    },
    username: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    status: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    created_at: DATE,
    updated_at: DATE,
  })

  return UserLoginRecord
}
