'use strict'

module.exports = app => {
  // 应用会等待这个函数执行完成才启动
  app.beforeStart(async function () {
    app.logger.info("服务器启动中...")
    const start = Date.now()
    // 同步数据库表结构
    await app.model.sync()
    // 初始化数据库数据 - 添加admin用户
    await app.model.User.findOrCreate({
      where: {username: 'admin'}, defaults: {
        username: 'admin',
        name: 'admin',
        email: 'admin@qq.com',
        cell_phone: '15895891210',
        password: '123456',
      },
    })
    app.logger.info('启动耗时 %d ms', Date.now() - start)
  })
}
