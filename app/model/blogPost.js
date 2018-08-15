'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const BlogPost = app.model.define('blog_post', {
    title: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    subtitle: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    publishDate: {
      type: DATE,
      unique: false,
      allowNull: true,
    },
    header_img: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    article: {
      type: STRING(10000),
      unique: false,
      allowNull: true,
    },
    created_at: DATE,
    updated_at: DATE,
  })

  BlogPost.associate = function () {
    app.model.BlogPost.belongsTo(app.model.User, {as: 'author'})
  }

  return BlogPost
}
