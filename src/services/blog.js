/**
 * @description 微博 service
 * @author Young
 */


const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
/**
 * db 创建微博
 * @param {String} userId 
 * @param {String} content 
 * @param {String} image 
 */
async function createBlog (userId, content, image) {
    const res = await Blog.create({
        userId,
        content,
        image
    })
    return res.dataValues
}


/**
 * 根据用户 查询微博
 * @param {Object} param0 查询参数
 */
async function getBlogListByUser ({ userName, pageIndex = 0, pageSize }) {
    const userWhereOpts = {}
    userName && (userWhereOpts.userName = userName)
    // 查询
    const res = await Blog.findAndCountAll({
        limit: pageSize, // 限制几条
        offset: pageIndex * pageSize, // 跳过几条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    // res.rows  查询结果 数组
    // res.count // 查询总数
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
 * 获取关注者的微博列表
 * @param {Object} param0 查询参数
 */
async function getFollowersBlogList ({ userId, pageIndex = 0, pageSize }) {
    const res = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: { userId }
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
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
}