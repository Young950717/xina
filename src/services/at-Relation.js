/**
 * @description 微博@用户关系 service
 * @author Young
 */

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


/**
 * 更新@relation内容
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 */
async function upDateAtRelation (
    { newIsRead }, // 要更新的内容
    { userId, isRead } // 条件
) {
    const updateData = {}
    newIsRead && (updateData.isRead = newIsRead)
    const whereData = {}
    userId && (whereData.userId = userId)
    isRead && (whereData.isRead = isRead)

    // 更新
    const res = await AtRelation.update(updateData,
        {
            where: whereData
        }
    )
    return res > 0
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    upDateAtRelation
}