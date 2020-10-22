/**
 * @description 数据模型入口文件
 * @author Young
 */
const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

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
Blog.hasMany(AtRelation, {
    foreignKey: 'blogId'
})
module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}