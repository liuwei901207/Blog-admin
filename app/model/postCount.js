'use strict'

module.exports = app => {
  const {INTEGER, DATE} = app.Sequelize

  const PostCount = app.model.define('post_count', {
    // 文章阅读次数
    ReadTimesCount: {
      type: INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 0,
    },
    // 文章点赞次数
    FabulousCount: {
      type: INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: DATE,
    updated_at: DATE,
  })

  return PostCount
}
