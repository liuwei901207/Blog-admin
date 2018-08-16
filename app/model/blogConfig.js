'use strict'

module.exports = app => {
  const {STRING, DATE} = app.Sequelize

  const BlogConfig = app.model.define('blog_config', {
    // 博客名称
    name: {
      type: STRING,
      unique: false,
      allowNull: false,
    },
    // 博客头像
    avatar: {
      type: STRING,
      unique: false,
      allowNull: false,
    },
    // 个性签名
    sign: {
      type: STRING,
      unique: false,
      allowNull: false,
    },
    // 微信支付二维码
    wxpay_qrcode: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 支付宝支付二维码
    alipay_qrcode: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // github
    github: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    // 网站备案号
    ICP: {
      type: STRING,
      unique: false,
      allowNull: true,
    },
    created_at: DATE,
    updated_at: DATE,
  })

  return BlogConfig
}
