/**
 * @description 用户关联关系
 * @author Young
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelations', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户id'
    }
})
module.exports = UserRelation