/**
 * @description 个人博客首页 api 路由
 * @author Young
 */

const router = require('koa-router')()
router.prefix('/api/profile')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListString } = require('../../utils/blog')
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const res = await getProfileBlogList(userName, pageIndex)
    res.data.blogListTpl = getBlogListString(res.data.blogList)
    ctx.body = res
})


module.exports = router