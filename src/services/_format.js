/**
 * @description 数据格式化
 * @author Young
 */
const { DEFALUT_AVATAR_URL } = require('../config/constants')
const { formatTimestamp } = require('../utils/dt')
function _formatUserPic (user) {
    user.picture = !user.picture ? DEFALUT_AVATAR_URL : user.picture
    return user
}

function _formatBlogTimestamp (blog) {
    blog.createdAtFormat = formatTimestamp(blog.createdAt)
    blog.updatedAtFormat = formatTimestamp(blog.updatedAt)
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

function formatBlog (list) {
    if (list === null) return list

    if (list instanceof Array) {
        return list.map(_formatBlogTimestamp)
    }
    return _formatBlogTimestamp(list)
}

module.exports = {
    formatUser,
    formatBlog
}