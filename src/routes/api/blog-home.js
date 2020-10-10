/**
 * @description 微博首页 api 
 * @author Young
 */

const router = require('koa-router')()
router.prefix('/api/blog')
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validate')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getBlogListString } = require('../../utils/blog')
// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create(userId, content, image)
})
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    const { id: userId } = ctx.session.userInfo
    pageIndex = parseInt(pageIndex)
    const res = await getHomeBlogList(userId, pageIndex)
    res.data.blogListTpl = getBlogListString(res.data.blogList)
    ctx.body = res
})


module.exports = router