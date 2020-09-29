/**
 * @description 404路由
 * @author Young
 */
const router = require('koa-router')()
router.get('/error', async (ctx, next) => {
    await ctx.render('error')
})
//404
router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router