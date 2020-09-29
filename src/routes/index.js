const router = require('koa-router')()
const jwt = require('jsonwebtoken')

const { loginRedirect } = require('../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})
router.get('/profile/:userName/:pageIndex', async (ctx, next) => {
    const { userName, pageIndex } = ctx.params
    ctx.body = {
        title: 'this is profilepage',
        userName,
        pageIndex
    }
})

router.get('/json', async (ctx, next) => {
    // const session = ctx.session
    // if (session.viewNum == null) {
    //     session.viewNum = 0
    // }
    // session.viewNum++
    ctx.body = {
        title: 'koa2 json'
        // viewNum: session.viewNum
    }
})
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    let userInfo
    if (userName === 'abc' && password === '123') {
        userInfo = {
            id: 1,
            name: 'abc',
            nickName: 'cvb'
        }
    }
    if (!userInfo) {
        ctx.body = {
            errno: 0,
            msg: '登录失败'
        }
    }
    return
})

module.exports = router
