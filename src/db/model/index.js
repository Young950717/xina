/**
 * @description 数据模型入口文件
 * @author Young
 */
const User = require('./User')
const Blog = require('./Blog')

// 关联外键
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
// User.hasMany() // 搜用户带微博

module.exports = {
    User,
    Blog
}