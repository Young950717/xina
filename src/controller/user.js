/**
 * @description user controller
 * @author Young
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo,
    exitNickNameInfo
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
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function login (ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
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

/**
 * 根据用户名删除用户信息
 * @param {String} userName 用户名
 */
async function deleteCurUser (userName) {
    // service
    const res = await deleteUser(userName)
    if (res) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)

}

/**
 * 更新用户信息
 * @param {Object} ctx  koa ctx
 * @param {String} nickName  需要修改的昵称
 * @param {String} city 需要修改的城市
 * @param {String} picture  需要修改的头像
 */
async function changeUserInfo (ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    const res = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture,
        },
        {
            userName
        })
    // if (res === '重复昵称') {
    //     return new ErrorModel(exitNickNameInfo)
    // }
    if (!res) {
        return new ErrorModel(changeInfoFailInfo)
    }
    Object.assign(ctx.session.userInfo, {
        nickName,
        city,
        picture
    })
    return new SuccessModel()
}

/**
 * 用户修改密码
 * @param {String} userName  用户名
 * @param {String} password  旧密码
 * @param {String} newPassword  新密码
 */
async function updateUserPwd (userName, password, newPassword) {
    const res = await updateUser(
        {
            newPassword: doCrypto(newPassword)
        },
        {
            userName,
            password: doCrypto(password)
        }
    )
    if (!res) {
        return new ErrorModel(changePasswordFailInfo)
    }
    // // 更新用户信息
    // Object.assign(ctx.session.userInfo, {
    //     password
    // })
    return new SuccessModel()
}

/**
 * 退出登录
 * @param {Object} ctx koa ctx
 */
async function logout (ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}


module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeUserInfo,
    updateUserPwd,
    logout
}