/**
 * @description 个人首页 controller
 * @author Young
 */


const { getBlogListByUser } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
// const { } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../config/constants')
/**
 * 获取个人主页微博列表
 * @param {String} userName 用户名
 * @param {Number} pageIndex 当前页
 */
async function getProfileBlogList (userName, pageIndex = 0) {
    const res = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const { blogList, count } = res
    return new SuccessModel({
        blogList,
        isEmpty: blogList.length === 0,
        count,
        pageIndex,
        pageSize: PAGE_SIZE
    })
}
module.exports = {
    getProfileBlogList
}