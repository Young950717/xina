/**
 * @description 微博@用户关系 service
 * @author Young
 */

const user = require('../controller/user')
const { AtRelation, Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博 @ 关系
 * @param {Number} blogId 
 * @param {Number} userId 
 */
async function createAtRelation (blogId, userId) {
    const res = await AtRelation.create({
        blogId,
        userId
    })
    return res.dataValues
}
/**
 * 获取@用户 未读的微博数量
 * @param {Number} userId 
 */
async function getAtRelationCount (userId) {
    const res = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return res.count
}

/**
 * 或者@微博列表
 * @param {Number} userId 
 * @param {Number} pageIndex 
 * @param {Number} pageSize 
 */
async function getAtUserBlogList (userId, pageIndex, pageSize) {
    const res = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            // 查给定userId被@的微博
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: { userId }
            },
            // 查信息
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    })
    let blogList = res.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blog => {
        const user = blog.user.dataValues
        blog.user = formatUser(user)
        return blog
    })
    return {
        blogList,
        count: res.count
    }
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList
}