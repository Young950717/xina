/**
 * @description about微博 controller
 * @author Young
 */
const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../config/constants')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-Relation')
/**
 * 为用户创建微博
 * @param {String} userId 用户id 查询条件 关联外键
 * @param {String} content 微博内容
 * @param {String} image 图片
 */
async function create (userId, content, image) {
    // 捕获微博内容，获取用户id 建立@关联
    // halo, @张三 - zhangsan 你好 @王五 - wangwu
    const atUserNameList = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            return matchStr
        }
    )
    // 根据用户名查询用户信息
    const atUserList = await Promise.all(
        atUserNameList.map(userName => {
            return getUserInfo(userName)
        })
    )
    // 根据用户信息获取用户id
    const atUserIdList = atUserList.map(user => {
        return user.id
    })

    try {
        const blog = await createBlog(userId, xss(content), image)
        // 创建@关系
        await Promise.all(atUserIdList.map(userId => {
            createAtRelation(blog.id, userId)
        }))
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