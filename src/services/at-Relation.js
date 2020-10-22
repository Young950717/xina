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
module.exports = {
    createAtRelation
}