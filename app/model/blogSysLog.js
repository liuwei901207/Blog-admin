'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const BlogSysLog = app.model.define('blog_sys_log', {
    // 记录用户IP
    IP: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 记录日志正文内容
    content: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 日志状态
    status: {
      type: STRING(30),
      allowNull: false,
      defaultValue: 'info',
      validate: {
        isIn: [['info', 'error']], // 普通信息、错误信息
      },
    },
    created_at: DATE,
    updated_at: DATE,
  })

  return BlogSysLog
}
