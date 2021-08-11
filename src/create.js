/**
 * 新增
 */
const { User, Blog } = require('./model')

!(async function () {
  // 创建用户
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三',
  })
  console.log('zhangsan', zhangsan.dataValues)
  const zhangsanId = zhangsan.dataValues.id

  const lisi = await User.create({
    userName: 'lisi',
    password: '123',
    nickName: '李四',
  })
  console.log('lisi', lisi.dataValues)
  const lisiId = lisi.dataValues.id

  // 创建博客
  const blog1 = await Blog.create({
    title: '张三创建的博客1',
    content: '张三大萨达撒发生的范德萨范德萨范德萨的',
    userId: zhangsanId,
  })
  const blog2 = await Blog.create({
    title: '张三创建的博客2',
    content: '范德萨发生过拾光盛典',
    userId: zhangsanId,
  })
  const blog3 = await Blog.create({
    title: '李四创建的博客1',
    content: '规范地方的好滴好滴',
    userId: lisiId,
  })
  const blog4 = await Blog.create({
    title: '李四创建的博客2',
    content: '热特润体乳特尔也有',
    userId: lisiId,
  })
})()
