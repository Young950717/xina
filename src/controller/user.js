/**
 * @description user contriller
 * @author Young
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo } = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
    // 调用services获取数据
    const userInfo = await getUserInfo(userName)
    // 统一返回格式
    console.log(userInfo)

    if (userInfo) {
        //能查出用户信息
        return new SuccessModel(userInfo)
    } else {
        //查不到 可用
        return new ErrorModel(registerUserNameNotExistInfo)
    }

}

/**
 * 注册
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (err) {
        console.error(err.message, err.stack)
        return new ErrorModel(registerFailInfo)
    }
}


module.exports = {
    isExist,
    register
}