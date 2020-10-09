/**
 * @description 用户关系
 * @author Young
 */


const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel } = require('../model/ResModel')

/**
 * 根据用户id获取他的粉丝
 * @param {Number} userId 
 */
async function getFans (userId) {
    const { count, userList } = await getUsersByFollower(userId)
    return new SuccessModel({
        count,
        fansList: userList
    })
}
module.exports = {
    getFans
}