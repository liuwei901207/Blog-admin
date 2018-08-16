'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const FriendCategory = app.model.define('friend_category', {
    // 友链分类名称
    name: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 友链分类状态设置
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

  FriendCategory.associate = function () {
    app.model.FriendCategory.belongsToMany(app.model.Friend, {as: 'friends', through: 'friend__friendCategory', constraints: false})
  }

  return FriendCategory
}
