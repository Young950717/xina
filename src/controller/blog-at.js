/**
 * @description 微博@关系 controller
 * @author Young
 */

const { getAtRelationCount } = require('../services/at-Relation')
const { SuccessModel } = require('../model/ResModel')


/**
 * 获取@我的微博数量
 * @param {Number} userId 
 */
async function getAtMeCount (userId) {
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
}

module.exports = {
    getAtMeCount
}