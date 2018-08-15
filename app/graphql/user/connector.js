'use strict'

const DataLoader = require('dataloader')

class UserConnector {
  constructor (ctx) {
    this.ctx = ctx
  }

  async getUserInfoByService (id) {
    return await this.ctx.service.user.getUserByIdOrAccount(id)
  }
}

module.exports = UserConnector