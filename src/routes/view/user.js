/**
 * @description user view路由
 * @author Young
 */
const router = require('koa-router')()

/**
 * 获取用户信息
 * @param {Object} ctx 
 */
function getLoginUserInfo (ctx) {
    let data = {
        isLogin: false
    }
    const userInfo = ctx.session.userInfo
    if (!userInfo) return data
    data = {
        isLogin: true,
        userName: userInfo.userName
    }
    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginUserInfo(ctx))
})
router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginUserInfo(ctx))
})

module.exports = router