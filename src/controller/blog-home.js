/**
 * @description about微博 controller
 * @author Young
 */
const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../config/constants')
/**
 * 为用户创建微博
 * @param {String} userId 用户id 查询条件 关联外键
 * @param {String} content 微博内容
 * @param {String} image 图片
 */
async function create (userId, content, image) {
    try {
        const blog = await createBlog(userId, xss(content), image)
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, es.stack)
        return new ErrorModel(createBlogFailInfo)
    }

}

/**
 * 获取微博首页列表
 * @param {Number} userId 
 * @param {Number} pageIndex 
 */
async function getHomeBlogList (userId, pageIndex = 0) {
    const res = await getFollowersBlogList(
        {
            userId,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const { count, blogList } = res
    return new SuccessModel({
        blogList,
        isEmpty: blogList.length === 0,
        count,
        pageIndex,
        pageSize: PAGE_SIZE
    })
}


module.exports = {
    create,
    getHomeBlogList
}