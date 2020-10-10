/**
 * @description 数据模型入口文件
 * @author Young
 */
const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// 关联外键
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})
UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})
module.exports = {
    User,
    Blog,
    UserRelation
}