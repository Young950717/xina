/**
 * @description json schema 验证中间件
 * @author Young
 */
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
/**
 * 生成json schema验证的方法
 * @param {Function} validateFn 
 */
function genValidator (validateFn) {
    // 定义中间件
    async function validator (ctx, next) {
        const data = ctx.request.body
        console.log(data)
        // 校验
        const error = validateFn(data)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return false
        }
        await next() //验证成功

    }
    // 返回中间件
    return validator
}
module.exports = {
    genValidator
}