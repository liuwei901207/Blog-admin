'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const PostCategory = app.model.define('post_category', {
    // 文章分类名称
    name: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 文章分类状态设置
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

  PostCategory.associate = function () {
    app.model.PostCategory.belongsToMany(app.model.Post, {as: 'posts', through: 'post__postCategory', constraints: false})
  }

  return PostCategory
}
