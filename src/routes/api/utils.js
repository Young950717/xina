/**
 * @description utils api 路由
 * @author Young
 */
const router = require('koa-router')()
router.prefix('/api/utils')
const { loginCheck } = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')
// const options = {
//     uploadDir: `${__dirname}/`,
//     keepExtensions: true
// }

// 上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    const files = ctx.req.files
    const { size, path, name, type } = files.file
    // // 调用controller
    ctx.body = await saveFile({
        size,
        FilepPath: path,
        name,
        type
    })
})

module.exports = router