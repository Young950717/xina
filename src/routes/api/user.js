/**
 * @description user API路由
 * @author Young
 */
const router = require('koa-router')()
const {
    isExist,
    register,
    login,
    deleteCurUser,
    changeUserInfo,
    updateUserPwd,
    logout
} = require('../../controller/user')
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

// 测试环境 删除用户
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

// 修改用户个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeUserInfo(ctx, { nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    // controller
    ctx.body = await updateUserPwd(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})


module.exports = router
