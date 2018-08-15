'use strict'

module.exports = {
  Query: {
    user (root, {id, name}, ctx) {
      if (id) {
        return ctx.connector.user.getUserInfoByService(id)
      } else if (name) {
        return ctx.connector.user.getUserInfoByService(name)
      }
    },
  },
  Mutation: {},
}