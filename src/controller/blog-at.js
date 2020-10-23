/**
 * @description 微博@关系 controller
 * @author Young
 */

const { getAtRelationCount, getAtUserBlogList } = require('../services/at-Relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../config/constants')

/**
 * 获取@我的微博数量
 * @param {Number} userId 
 */
async function getAtMeCount (userId) {
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
}

/**
 * 或者@用户的微博列表
 * @param {Numner} userId 
 * @param {Number} pageIndex 
 */
async function getAtMeBlogList (userId, pageIndex = 0, pageSize = PAGE_SIZE) {
    const { blogList, count } = await getAtUserBlogList(userId, pageIndex, pageSize)
    return new SuccessModel({
        blogList,
        isEmpty: blogList.length === 0,
        count,
        pageIndex,
        pageSize: PAGE_SIZE,
        count
    })
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList
}