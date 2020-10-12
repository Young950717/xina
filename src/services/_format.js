/**
 * @description 数据格式化
 * @author Young
 */
const { DEFALUT_AVATAR_URL, REG_FOR_AT_WHO } = require('../config/constants')
const { formatTimestamp } = require('../utils/dt')
function _formatUserPic (user) {
    user.picture = !user.picture ? DEFALUT_AVATAR_URL : user.picture
    return user
}

/**
 * 格式化时间戳
 * @param {Object} blog 
 */
function _formatBlogTimestamp (blog) {
    blog.createdAtFormat = formatTimestamp(blog.createdAt)
    blog.updatedAtFormat = formatTimestamp(blog.updatedAt)
    return blog
}

function _formatBlogContent (blog) {
    blog.formatContent = blog.content
    blog.formatContent = blog.formatContent.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        })
    return blog
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者一个用户对象
 */
function formatUser (list) {

    if (list === null) return list

    if (list instanceof Array) {
        return list.map(_formatUserPic)
    }
    return _formatUserPic(list)

}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者一条微博对象 
 */
function formatBlog (list) {
    if (list === null) return list

    if (list instanceof Array) {
        return list.map(_formatBlogTimestamp).map(_formatBlogContent)
    }
    let res = list
    res = _formatBlogTimestamp(list)
    res = _formatBlogContent(list)
    return res
}

module.exports = {
    formatUser,
    formatBlog
}