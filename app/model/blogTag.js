'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const BlogTag = app.model.define('blog_tag', {
    name: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    created_at: DATE,
    updated_at: DATE,
  })

  Blog.associate = function () {
    app.model.Blog.belongsTo(app.model.User, {as: 'author'})
  }

  BlogTag.associate = function() {
    app.model.BlogTag.belongsToMany(app.model.BlogPost, { as: 'posts', through: 'post_postTag', constraints: false });
  };

  return BlogTag
}
