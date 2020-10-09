/**
 * @description 微博view路由
 * @author Young
 */
const router = require('koa-router')()

const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/user-relation')

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
    const myUserName = userInfo.userName
    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
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

    // 获取第一页微博数据
    const res = await getProfileBlogList(curUserName, 0)
    const { blogList, isEmpty, count, pageIndex, pageSize } = res.data
    // 获取粉丝
    const fansRes = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansRes.data
    // 是否关注了此人
    const amIFollowed = fansList.some(o => {
        return o.userName === myUserName
    })
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
            isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            amIFollowed
        },
    })
})

router.get('/square', loginRedirect, async (ctx, next) => {
    const res = await getSquareBlogList(0)
    const { blogList, isEmpty, count, pageIndex, pageSize } = res.data
    await ctx.render('square', {
        blogData: {
            blogList,
            isEmpty,
            count,
            pageIndex,
            pageSize
        },
    })
})

module.exports = router