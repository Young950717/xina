/**
 * @description 微博首页 api 
 * @author Young
 */

const router = require('koa-router')()
router.prefix('/api/blog')
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog')
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validate')
// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create(userId, content, image)
})


module.exports = router