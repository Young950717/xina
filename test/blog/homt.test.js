/**
 * @description 首页test
 * @author Young
 */


const server = require('../server')
const { COOKIE } = require('../testUserInfo')

let BLOG_ID = '' // 创建的微博id

test('创建一个微博应该成功', async () => {
    let content = `测试微博数据${Date.now()}`
    let image = `测试图片${Date.now()}.png`
    const res = await server.post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', COOKIE)
    expect(res.body.errNum).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
    BLOG_ID = res.body.data.id
})