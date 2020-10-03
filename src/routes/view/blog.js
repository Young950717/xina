/**
 * @description 微博view路由
 * @author Young
 */
const router = require('koa-router')()

const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index')
})

router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 已登录的用户信息
    const userInfo = ctx.session.userInfo
    const userName = userInfo.userName
    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = userName === curUserName
    if (isMe) {
        curUserInfo = userInfo
    } else {
        const exitRes = await isExist(curUserName)
        if (exitRes.errNum !== 0) {
            return
        } else {
            curUserInfo = exitRes.data
        }
    }

    const res = await getProfileBlogList(curUserName, 0)
    const { blogList, isEmpty, count, pageIndex, pageSize } = res.data
    await ctx.render('profile', {
        blogData: {
            blogList,
            isEmpty,
            count,
            pageIndex,
            pageSize
        },
        userData: {
            userInfo: curUserInfo,
            isMe
        }
    })
})

module.exports = router