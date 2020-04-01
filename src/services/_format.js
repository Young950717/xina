/**
 * @description 数据格式化
 * @author Young
 */
const { DEFALUT_AVATAR_URL } = require('../config/constants')

function _formatUserPic(user) {
    user.picture = user.picture === '' || null ? DEFALUT_AVATAR_URL : user.picture
    return user
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者一个用户对象
 */
function formatUser(list) {

    if (list === null) return list

    if (list instanceof Array) {
        return list.map(_formatUserPic)
    }
    if (list instanceof Object) {
        return _formatUserPic(list)
    }
}
module.exports = {
    formatUser
}