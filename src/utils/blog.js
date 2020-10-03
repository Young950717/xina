/**
 * @description 微博数据相关的工具方法
 * @author Young
 */

const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

// 获取blog-list.ejs的内容
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()


/**
 * 根据blog-list转化成html格式的字符串
 * @param {Array} blogList 微博列表
 * @param {Boolean} canReply 是否可回复
 */
function getBlogListString (blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}
module.exports = {
    getBlogListString
}