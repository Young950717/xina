const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
// const jwtKoa = require('koa-jwt')
const path = require('path')
const session = require('koa-generic-session') // session
const redisStore = require('koa-redis') // koa操作redis
const { REDIS_CONF } = require('./config/db')
const { isProd } = require('./utils/env')
// const { SECRET } = require('../conf/constants')
const { SESSION_KEY } = require('./config/secret')

// 工具类api
const utilsAPIRouter = require('./routes/api/utils')
// 用户相关
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
// 微博相关
const blogViewRouter = require('./routes/view/blog')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogProfileAPIRouter = require('./routes/api/blog-profile')
const blogSquareAPIRouter = require('./routes/api/blog-square')
// 错误页面
const errorViewRouter = require('./routes/view/error')

let errorConfig = {}
if (isProd) {
    errorConfig = {
        redirect: '/error'
    }
}

// error handler
onerror(app, errorConfig)

// app.use(jwtKoa({
//     secret: SECRET
// }).unless({
//     path: [/^\/users\/login/] // 自定义那些年目录忽略jwt验证
// })
// )


// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))


// session配置
app.keys = [SESSION_KEY]
app.use(session({
    key: 'weibo.sid', // cookie name的前缀
    prefix: 'weibo:sess:', // redis key的前缀
    cookie: {
        path: '/', // 存在的路径
        httpOnly: true, // 只能服务端改
        maxAge: 24 * 60 * 60 * 1000 // cookie失效时间(ms)
    },
    // ttl: 24 * 60 * 60 * 1000, // redis失效时间(ms) 默认和cookie一致
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(blogProfileAPIRouter.routes(), blogProfileAPIRouter.allowedMethods())
app.use(blogSquareAPIRouter.routes(), blogSquareAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //放在最后


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
