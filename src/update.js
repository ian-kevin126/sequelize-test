/**
 * 更新
 */
const { User, Blog } = require('./model')

!(async function () {
  // 更新zhangsan
  const updateRes = await User.update(
    {
      nickName: '张三11111',
    },
    {
      where: {
        userName: 'zhangsan',
      },
    }
  )
  // 大于0表示更新成功，否则更新失败
  console.log('updateRes', updateRes[0] > 0)
})()
