'use strict'

const DataLoader = require('dataloader')

class UserConnector {
  constructor (ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }
  async getUserInfoByService (id) {
    return await this.ctx.service.user.getUserByIdOrAccount(id)
  }
  async loginByService (account, password, rememberMe) {
    return await this.ctx.service.user.findUserByAccountAndPassword({account, password, rememberMe})
  }
}

module.exports = UserConnector