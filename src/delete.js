/**
 * 删除
 */
const { User, Blog } = require('./model')

!(async function () {
  // s删除一条博客
  // const deleteRes = await Blog.destroy({
  //   where: {
  //     id: 4,
  //   },
  // })
  // // 大于1表示删除成功，否则删除失败
  // console.log('deleteRes', deleteRes > 0)

  // 删除一个用户，这里就关系到外键
  const deleteUser = await User.destroy({
    where: {
      id: 1,
    },
  })
  console.log('deleteUser11', deleteUser)
})()
