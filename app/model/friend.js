'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const Friend = app.model.define('friend', {
    // 友链名称
    name: {
      type: STRING,
      unique: false,
      allowNull: false,
    },
    // 友链地址
    link: {
      type: STRING,
      unique: false,
      allowNull: false,
    },
    // 友链所有者
    owner: {
      type: STRING,
      unique: false,
      allowNull: false,
    },
    // 状态设置
    status: {
      type: STRING(30),
      allowNull: false,
      defaultValue: 'published',
      validate: {
        isIn: [['published', 'conceal']], // 发布、隐藏
      },
    },
    created_at: DATE,
    updated_at: DATE,
  })

  return Friend
}
