/**
 * @description user service
 * @author Young
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo (userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    // 查询
    const res = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    // 没有找到
    if (!res) return res
    // 格式化处理 ---
    return formatUser(res.dataValues)
}
module.exports = {
    getUserInfo
}