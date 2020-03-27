const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../../conf/constants')
const util = require('util')
const verify = util.promisify(jwt.verify)
router.prefix('/users')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

// 模拟登陆
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    let userInfo = null
    if (userName === 'young' && password === 'qwe') {
        userInfo = {
            userName,
            password,
        }
    }
    let token
    if (userInfo) {
        token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
    }
    if (userInfo === null) {
        ctx.body = {
            code: -1,
            msg: 'login fail'
        }
        return
    } else {
        ctx.body = {
            code: 200,
            msg: 'login success',
            token
        }

    }

})


// 获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
    const token = ctx.header.authorization
    try {
        const payload = await verify(token.split(' ')[1], SECRET)
        ctx.body = {
            code: 200,
            msg:'success',
            userInfo: payload
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg:'fail',
            userInfo: payload
        }
    }
    
})

module.exports = router
