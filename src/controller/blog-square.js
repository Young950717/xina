/**
 * @description 微博广场页
 * @author Young
 */

const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../config/constants')
const { getSquareCacheList } = require('../cache/blog')

/**
 * 获取微博广场页面列表
 * @param {Number} pageIndex 当前页数
 */
async function getSquareBlogList (pageIndex = 0) {
    // 访问cache
    const res = await getSquareCacheList(pageIndex, PAGE_SIZE)
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
    getSquareBlogList
}