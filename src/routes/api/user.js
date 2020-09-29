/**
 * @description user API路由
 * @author Young
 */
const router = require('koa-router')()
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
router.prefix('/api/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validate')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

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

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

router.post('/delete', loginCheck, async (ctx, next) => {
    // 调用controller方法
    if (isTest) {
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

module.exports = router
