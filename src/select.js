/**
 * 查询
 */
const { User, Blog } = require('./model')

!(async function () {
  // 查询一条记录
  const zhangsan = await User.findOne({
    where: {
      userName: 'zhangsan',
    },
  })

  // 查询特定的列
  const zhangsanName = await User.findOne({
    attributes: ['userName', 'nickName'],
    where: {
      userName: 'zhangsan',
    },
  })

  console.log('zhangsanName', zhangsanName.dataValues) // zhangsanName { userName: 'zhangsan', nickName: '张三' }

  // 查询一个列表
  const zhangsanList = await Blog.findAll({
    where: {
      userId: 1,
    },
    // 排序规则
    order: [['id', 'desc']],
  })
  console.log(
    'zhangsanList',
    zhangsanList.map((blog) => blog.dataValues)
  )

  // 分页
  const blogPageableList = await Blog.findAll({
    limit: 2, // 限制本次查询数量为2条
    offset: 2, // 跳过多少条，0也就是第1页
    order: [['id', 'desc']],
  })
  console.log(
    'blogPageableList',
    blogPageableList.map((blog) => blog.dataValues)
  )

  // 查询总数
  const blogCount = await Blog.findAndCountAll({
    limit: 2, // 限制本次查询数量为2条
    offset: 0, // 跳过多少条，0也就是第1页
    order: [['id', 'desc']],
  })
  console.log(
    'blogCount',
    blogCount.count, // 所有的总数，不考虑分页
    blogCount.rows.map((blog) => blog.dataValues) // 显示的第offset页的limit个数据
  )

  /**
   * 链表查询1，依赖于model里面的外键关联，否则查不了
   Blog.belongsTo(User, {
    // 创建外键 Blog.userId ——> User.id
    foreignKey: 'userId',
  })
  **/
  const blogListWithUser = await Blog.findAndCountAll({
    order: [['id', 'desc']],
    include: [
      {
        // 链表查询，关联的model是User
        model: User,
        attributes: ['userName', 'nickName'],
        where: {
          userName: 'zhangsan',
        },
      },
    ],
  })
  console.log(
    'blogListWithUser',
    blogListWithUser.count,
    blogListWithUser.rows.map((blog) => {
      const blogValue = blog.dataValues
      blogValue.user = blogValue.user.dataValues
      return blogValue
    })
  )

  /**
   * 链表查询2，依赖于model里面的外键关联，否则查不了
   User.hasMany(Blog, {
    // 创建外键 Blog.userId ——> User.id
    foreignKey: 'userId',
  })
  **/
  const userListWithBlog = await User.findAndCountAll({
    ttributes: ['userName', 'nickName'],
    include: [
      {
        // 链表查询，关联的model是Blog
        model: Blog,
      },
    ],
  })
  console.log(
    'userListWithBlog',
    userListWithBlog.count,
    userListWithBlog.rows.map((user) => {
      const userValue = user.dataValues
      userValue.blogs = userValue.blogs.map((blog) => blog.dataValues)
      return userValue
    })
  )
})()
