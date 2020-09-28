/**
 * @description user API路由
 * @author Young
 */
const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')
router.prefix('/api/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validate')

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})
module.exports = router
