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
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'password', 'picture', 'city'],
        where: whereOpt
    })
    if (result === null) {
        return result
    }
    // 格式化
    return formatUser(result.dataValues)
}

/**
 * 创建用户
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 * @param {string} nickName 
 */
async function createUser({userName,password,gender=3,nickName}){
    const user = await User.create({
        userName,
        password,
        gender,
        nickName:nickName?nickName:`${userName}${Math.random().toString(36).slice(-5)}`
    })
    return user.dataValues
}
module.exports = {
    getUserInfo,
    createUser
}