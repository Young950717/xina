/**
 * @description user contriller
 * @author Young
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo
} = require('../model/ErrorInfo')

const { doCrypto } = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist (userName) {
    const userInfo = await getUserInfo(userName)
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
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 存在
        return new ErrorModel(registerUserNameExistInfo)
    } else {
        // 调用service存数据库
        try {
            await createUser({
                userName,
                password: doCrypto(password),
                gender
            })
            return new SuccessModel()
        } catch (err) {
            console.error(err)
            return new ErrorModel(registerFailInfo)
        }
    }
}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function login (ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    console.log(userInfo)
    if (!userInfo) {
        // 失败
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功 
    if (!ctx.session.userInfo) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()

}

module.exports = {
    isExist,
    register,
    login
}