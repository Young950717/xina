/**
 * @description 微博广场页api
 * @author Young
 */

const router = require('koa-router')()
router.prefix('/api/square')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListString } = require('../../utils/blog')
const { getSquareBlogList } = require('../../controller/blog-square')
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let pageIndex = parseInt(ctx.params.pageIndex)
    const res = await getSquareBlogList(pageIndex)
    res.data.blogListTpl = getBlogListString(res.data.blogList)
    ctx.body = res
})

module.exports = router