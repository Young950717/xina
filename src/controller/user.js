/**
 * @description user contriller
 * @author Young
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')

/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist (userName) {
    const userInfo = await getUserInfo(userName)
    console.log(userInfo)
    if (userInfo) {

        // 存在
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 */
async function register ({ userName, password, gender }) {

}


module.exports = {
    isExist,
    register
}