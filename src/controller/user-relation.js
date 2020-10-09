/**
 * @description 用户关系
 * @author Young
 */


const {
    getUsersByFollower,
    addFollower, deleteFollower,
    getFollowerByUser
} = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

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

/**
 * 获取关注人列表
 * @param {Number} userId 
 */
async function getFollower (userId) {
    const { count, followerList } = await getFollowerByUser(userId)
    return new SuccessModel({
        count,
        followerList
    })
}

/**
 * 关注
 * @param {Number} myUserId 当前用户登录id
 * @param {Number} curUserId 要被关注的人的id
 */
async function follow (myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (err) {
        console.error(err)
        return new ErrorModel(addFollowerFailInfo)
    }

}

/**
 * 取消关注
 * @param {Number} myUserId 当前用户登录id
 * @param {Number} curUserId 取消关注的人的id
 */
async function unfollow (myUserId, curUserId) {
    const res = await deleteFollower(myUserId, curUserId)
    if (res) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)

}

module.exports = {
    getFans,
    getFollower,
    follow,
    unfollow
}