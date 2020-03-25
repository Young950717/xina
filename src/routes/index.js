const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/profile/:userName/:pageIndex', async (ctx,next)=>{
  const { userName,pageIndex } = ctx.params
  ctx.body = {
    title:'this is profilepage',
    userName,
    pageIndex
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
