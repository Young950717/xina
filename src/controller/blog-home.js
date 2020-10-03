/**
 * @description about微博 controller
 * @author Young
 */
const xss = require('xss')
const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

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
        return new ErrorModel(createBlogFailInfo)
        console.error(ex.message, es.stack)
    }

}
module.exports = {
    create
}