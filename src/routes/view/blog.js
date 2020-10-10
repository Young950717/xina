/**
 * @description 微博view路由
 * @author Young
 */
const router = require('koa-router')()

const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollower } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')
const { isExist } = require('../../controller/user')
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo
    // 获取粉丝
    const fansRes = await getFans(userId)
    const { count: fansCount, fansList } = fansRes.data

    // 获取关注人列表
    const followerRes = await getFollower(userId)
    const { count: followerCount, followerList } = followerRes.data

    // 获取首页微博
    const blogRes = await getHomeBlogList(userId, 0)
    const { blogList, isEmpty, count, pageIndex, pageSize } = blogRes.data

    await ctx.render('index', {
        blogData: {
            blogList,
            isEmpty,
            count,
            pageIndex,
            pageSize
        },
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followerCount,
                list: followerList
            }
        },
    })
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

    // 获取关注人列表
    const followerRes = await getFollower(curUserInfo.id)
    const { count: followerCount, followerList } = followerRes.data


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
            followersData: {
                count: followerCount,
                list: followerList
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