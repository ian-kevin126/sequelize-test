const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql',
}

// 线上环境使用连接池
// conf.pool = {
//   max: 5, // 连接池中最大的连接数量
//   min: 0, // 连接池中最小的连接数量
//   idle: 10000, // 如果一个连接10s内没有被使用，则释放
// }

const seq = new Sequelize('koa2_weibo_db', 'root', 'ljy760155', conf)

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('ok')
  })
  .catch((err) => {
    console.log(err)
  })

module.exports = seq
