'use strict'

module.exports = app => {
  const {STRING, INTEGER, DATE} = app.Sequelize

  const PostComment = app.model.define('post_comment', {
    // 评论嵌套父ID
    pid: {
      type: INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 0,
    },
    // 评论者姓名
    name: {
      type: STRING,
      unique: false,
      allowNull: false,
    },
    // 评论者邮箱
    email: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 评论正文内容
    content: {
      type: STRING,
      unique: false,
      allowNull: false,
    },
    // 评论者是否为文章作者
    is_author: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1]], // 0: 不是作者 1: 是作者
      },
    },
    created_at: DATE,
    updated_at: DATE,
  })

  PostComment.associate = function () {
    app.model.PostComment.hasMany(PostComment, {foreignKey: 'pid', as: 'children', through: null, constraints: false})
  }

  return PostComment
}
