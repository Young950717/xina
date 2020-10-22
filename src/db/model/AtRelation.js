/**
 * @description 微博@的数据模型
 * @author Young
 */

const seq = require('../seq')
const { BOOLEAN, INTEGER } = require('../types')
const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        comment: '是否已读',
        defaultValue: false // 默认未读

    }
})
module.exports = AtRelation