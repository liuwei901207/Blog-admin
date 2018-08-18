'use strict'

module.exports = {
  Query: {},
  Mutation: {
    login (root, {username, password, rememberMe}, ctx) {
      return ctx.connector.token.getTokenByService(username, password,
        rememberMe)
    },
    logout (root, {}, ctx) {
      return ctx.connector.token.ClearTokenByService()
    },
  },
}