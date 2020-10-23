/**
 * @description 微博@用户关系 service
 * @author Young
 */

const { AtRelation } = require('../db/model/index')

/**
 * 创建微博 @ 关系
 * @param {Number} blogId 
 * @param {Number} userId 
 */
async function createAtRelation (blogId, userId) {
    const res = await AtRelation.create({
        blogId,
        userId
    })
    return res.dataValues
}
/**
 * 获取@用户 未读的微博数量
 * @param {Number} userId 
 */
async function getAtRelationCount (userId) {
    const res = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return res.count
}

module.exports = {
    createAtRelation,
    getAtRelationCount
}