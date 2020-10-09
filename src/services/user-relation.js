/**
 * @description 用户关系service
 * @author Young
 */

const { UserRelation, User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表 即该用户的粉丝
 * @param {Number} followerId  被关注人的id
 */
async function getUsersByFollower (followerId) {
    const res = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }

            }
        ]
    })
    let userList = res.rows.map(row => row.dataValues)
    userList = formatUser(userList)
    return {
        count: res.count,
        userList
    }
}

/**
 * 添加关注关系
 * @param {Number} userId 用户id
 * @param {Number} followerId 被关注用户id
 */
async function addFollower (userId, followerId) {
    const res = UserRelation.create({
        userId,
        followerId
    })
    return res.dataValues
}

/**
 * 删除关注关系
 * @param {Number} userId 
 * @param {Number} unFollowerId 
 */
async function deleteFollower (userId, followerId) {
    const res = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return res > 0
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower
}