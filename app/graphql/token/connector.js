'use strict'

const DataLoader = require('dataloader')

class TokenConnector {
  constructor (ctx) {
    this.ctx = ctx
  }

  async getTokenByService (username, password, rememberMe) {
    return await this.ctx.service.user.userLogin(
      {username, password, rememberMe})
  }

  async ClearTokenByService () {
    return await this.ctx.service.user.userLogout()
  }
}

module.exports = TokenConnector