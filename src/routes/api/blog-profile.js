/**
 * @description 个人博客首页 api 路由
 * @author Young
 */

const router = require('koa-router')()
router.prefix('/api/profile')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListString } = require('../../utils/blog')
const { follow, unfollow } = require('../../controller/user-relation')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const res = await getProfileBlogList(userName, pageIndex)
    res.data.blogListTpl = getBlogListString(res.data.blogList)
    ctx.body = res
})

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await follow(myUserId, curUserId)
})
// 取消关注
router.post('/unfollow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await unfollow(myUserId, curUserId)
})


module.exports = router