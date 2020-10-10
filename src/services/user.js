/**
 * @description user service
 * @author Young
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
const { addFollower } = require('./user-relation')


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
    // 格式化处理 
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
    const res = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : `${userName}-${Math.random().toString(36).slice(-4)}`
    })
    const data = res.dataValues
    // 创建用户之后 使其自己关注自己（更好的展示首页）
    addFollower(data.id, data.id)
    return data
}

/**
 * 根据用户名删除用户
 * @param {String} userName 用户名
 */
async function deleteUser (userName) {
    const res = await User.destroy({
        where: {
            userName
        }
    })
    return res > 0 // 删除行数
}

/**
 * 修改用户信息
 * @param {Object} obj 需要替换的数据 
 * @param {Object} obj 查询条件 
 */
async function updateUser (
    {
        newNickName,
        newCity,
        newPicture,
        newPassword
    }, {
        userName,
        password
    }) {
    // 拼接内容
    const updateData = {}
    newPassword && (updateData.password = newPassword)
    newNickName && (updateData.nickName = newNickName)
    newCity && (updateData.city = newCity)
    newPicture && (updateData.picture = newPicture)

    // 查询条件
    const whereData = {
        userName
    }
    password && (whereData.password = password)

    // console.log(updateData, whereData);
    // 修改
    const res = await User.update(updateData, {
        where: whereData
    })
    // console.log(res)
    return res[0] > 0

}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}