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
    console.log(res)
    let userList = res.rows.map(row => row.dataValues)
    userList = formatUser(userList)
    return {
        count: res.count,
        userList
    }
}
module.exports = {
    getUsersByFollower
}