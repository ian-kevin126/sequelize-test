const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建 User 模，数据表的名字会自动从user变为users
const User = seq.define('user', {
  // id 会自动创建，并设置为主键、自增
  userName: {
    type: Sequelize.STRING, // username的类型，对应到mysql数据库中是VARCHAR(255)
    allowNull: false, // 是否允许为空
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称',
  },
  // 自动创建 createAt 和 updateAt
})

// 创建 Blog 模型
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

// 外键关联
Blog.belongsTo(User, {
  // 创建外键 Blog.userId ——> User.id
  foreignKey: 'userId',
})

// Blog.belongsTo(User) 如果User和Blog都不定义id类字段，这种简单的方式也可以创建外键，但是不推荐
// 创建一对多的关系
User.hasMany(Blog, {
  // 创建外键 Blog.userId ——> User.id
  foreignKey: 'userId',
})

module.exports = {
  User,
  Blog,
}
