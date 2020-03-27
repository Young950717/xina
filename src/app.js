const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')
const session = require('koa-generic-session') // session
const redisStore = require('koa-redis') // koa操作redis
const { REDIS_CONF } = require('./config/db')
const { isProd } = require('./utils/env')

let errorConfig = {}
if (isProd) {
    errorConfig = {
        redirect: '/error'
    }
}

// error handler
onerror(app, errorConfig)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))


// session配置
app.keys = ['G$IHoj9_kd&']
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
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
