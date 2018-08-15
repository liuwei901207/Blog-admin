'use strict'

// app/service/users.js

const Service = require('egg').Service
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

class UserService extends Service {

  /**
   * 带分页、排序参数查询文章列表信息
   * @param {number} offset - 分页参数
   * @param {number} limit - 分页参数
   * @param {string} order_by - 排序参数
   * @param {string} order - 排序参数
   * @return {Promise<*>} - 返回promise
   */
  async list ({offset = 0, limit = 10, order_by = 'created_at', order = 'ASC', search}) {
    offset = Number(offset)
    limit = Number(limit)
    let option = {}
    if (search) {
      option = {
        where: {
          name: {
            [this.ctx.model.Op.like]: `%${search}%`,
          },
        },
        offset,
        limit,
        order: [[order_by, order.toUpperCase()]],
      }
    } else {
      option = {
        offset,
        limit,
        order: [[order_by, order.toUpperCase()]],
      }
    }

    const result = await this.ctx.model.User.findAndCountAll(option)

    return {
      total: result.count,
      rows: result.rows,
    }
  }

  /**
   * 带id查询一条用户信息
   * @param {number} userID_or_userAccount - 用户ID或者用户username
   * @return {Promise<*>} - 返回promise
   */
  async getUserByIdOrAccount (userID_or_userAccount) {
    const user = await this.ctx.model.User.findOne({
      where: {
        $or: [
          {
            id:
              {
                $eq: userID_or_userAccount,
              },
          },
          {
            account:
              {
                $eq: userID_or_userAccount,
              },
          },
        ],
      },
    }, {
      attributes: {exclude: ['password']},
    })
    if (!user) {
      return null
    }
    return user
  }

  /**
   * 创建一条新用户信息
   * @param {object} user - 用户数据
   * @return {Promise<user>} - 返回promise
   */
  async create (user) {
    console.log(user)
    return this.ctx.model.User.create(user)
  }

  /**
   * 带id更新一条用户信息
   * @param {number} id - 用户ID
   * @param {object} updates - 用户更新数据
   * @return {Promise<Promise<*>|IDBRequest|Promise<void>|void>} - 返回promise
   */
  async update ({id, updates}) {
    const user = await this.ctx.model.User.findById(id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user.update(updates)
  }

  /**
   * 带id删除一条用户信息
   * @param {number} id - 用户ID
   * @return {Promise<*>} - 返回promise
   */
  async del (id) {
    const user = await this.ctx.model.User.findById(id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user.destroy()
  }

  /**
   * 用户登录
   * @param {string} name - 账户
   * @param {string} password - 密码
   * @return {Promise<*>} - 返回promise
   */
  async findUserByAccountAndPassword ({username, password, rememberMe}) {
    const ctx = this.ctx
    const md5 = crypto.createHash('md5')
    password = md5.update(password).digest('hex')
    const user = await this.ctx.model.User.findOne({
      attributes: {exclude: ['password']}, // 不包含密码字段
      where: {
        username,
        password,
      },
    })
    if (!user) {
      ctx.throw(404, 'user login failed')
    }

    await user.update({last_sign_in_at: new Date()}) // 添加登录时间

    // todo 如果用户勾选了 `记住我`，设置 30 天的过期时间
    user.token = jwt.sign({uid: user.id}, 'secret', {
      expiresIn: 60 * 60,
    })

    return user
  }

  /**
   * 用户登出
   * @return {Promise<boolean>} - 返回登出状态
   */
  async userLogout () {
    const ctx = this.ctx
    const user = ctx.session.user
    if (user) {
      ctx.session.user = null
      ctx.locals.user = null
      ctx.locals.serverMessage = {
        type: 'alert-info',
        content: '您已经登出系统',
      }
      return true
    }
    return false
  }

  async changePass ({password, new_password, re_password}) {
    const ctx = this.ctx
    const username = this.ctx.session.user.username
    if (new_password !== re_password) {
      ctx.throw(422, 're_password is not equal to new_password')
    }
    password = crypto.createHash('md5').update(password).digest('hex')
    new_password = crypto.createHash('md5').update(new_password).digest('hex')
    const update = await this.ctx.model.User.update({
      password: new_password,
    }, {
      where: {
        username,
        password,
      },
    })

    if (update[0] === 0) {
      ctx.throw(422, 'change password failed')
    }

    ctx.session.user = null

    return update
  }

}

module.exports = UserService
