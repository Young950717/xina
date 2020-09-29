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
/**
 * 
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 * @param {string} nickName 
 */
async function createUser ({ userName, password, gender = 3, nickName }) {
    const res = User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : `${userName}-${Math.random().toString(36).slice(-4)}`
    })
    return res.dataValues
}

/**
 * 根据用户名删除用户
 * @param {String} userName 用户名
 */
async function deleteUser (userName) {
    const res = User.destroy({
        where: {
            userName
        }
    })
    return res > 0 // 删除行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser
}