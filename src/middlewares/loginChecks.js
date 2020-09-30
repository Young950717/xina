/**
 * @description 登录验证中间件
 * @author Young
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')
// api登录验证
async function loginCheck (ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return false
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)

}
// 页面登录验证
async function loginRedirect (ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return false
    }
    const curUrl = ctx.url
    ctx.redirect(`/login?url=${curUrl}`)
    // decodeURIComponent //解密
    // encodeURIComponent //加密

}
module.exports = {
    loginCheck,
    loginRedirect
}