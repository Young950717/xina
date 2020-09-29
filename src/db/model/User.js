/**
 * @description 用户数据模型
 * @author Young
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// users
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true, // 唯一
        comment: '用户名'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        comment: '性别1男 2女 3保密',
        defaultValue: 3
    },
    picture: {
        type: STRING,
        comment: '头像 图片地址'
    },
    city: {
        type: STRING,
        comment: '城市'
    }
})
module.exports = User 