'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const Post = app.model.define('post', {
    // 文章标题
    title: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 文章简介
    subtitle: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 文章发布日期
    publishDate: {
      type: DATE,
      unique: false,
      allowNull: true,
    },
    // 文章封面图片
    header_img: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 文章内容
    content: {
      type: STRING(10000),
      unique: false,
      allowNull: true,
    },
    // 文章状态设置
    status: {
      type: STRING(30),
      allowNull: false,
      defaultValue: 'draft',
      validate: {
        isIn: [['draft', 'published', 'archived']], // 草稿、发布、归档
      },
    },
    created_at: DATE,
    updated_at: DATE,
  })

  Post.associate = function () {
    app.model.Post.belongsTo(app.model.User, {as: 'author'})
    app.model.Post.hasOne(app.model.PostCount, {as: 'postCount'})
    app.model.Post.belongsToMany(app.model.PostComment, {as: 'comments', through: 'post__postComment', constraints: false})
  }

  return Post
}
