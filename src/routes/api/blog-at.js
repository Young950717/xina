/**
 * @description 微博@用户 api
 * @author Young
 */

const router = require('koa-router')()
router.prefix('/api/atMe')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListString } = require('../../utils/blog')
const { getAtMeBlogList } = require('../../controller/blog-at')

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const { id: userId } = ctx.session.userInfo
    const res = await getAtMeBlogList(userId, pageIndex)
    res.data.blogListTpl = getBlogListString(res.data.blogList)
    ctx.body = res
})
module.exports = router
