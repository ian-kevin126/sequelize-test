const seq = require('./seq')

require('./model')

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('auth ok')
  })
  .catch(() => {
    console.log('sync err')
  })

// 开始同步
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})
