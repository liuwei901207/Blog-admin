'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const PostTag = app.model.define('post_tag', {
    // 文章标签名称
    name: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 文章标签状态设置
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

  PostTag.associate = function () {
    app.model.PostTag.belongsToMany(app.model.Post, {as: 'posts', through: 'post__postTag', constraints: false})
  }

  return PostTag
}
