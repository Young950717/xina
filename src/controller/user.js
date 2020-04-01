/**
 * @description user contriller
 * @author Young
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { userNameIsExistInfo } = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
    // 调用services获取数据
    const userInfo = await getUserInfo(userName)
    // 统一返回格式
    if (userInfo) {
        //能查出用户信息
        return new SuccessModel(userInfo)
    } else {
        //查不到 可用
        return new ErrorModel(userNameIsExistInfo)
    }

}

module.exports = {
    isExist
}