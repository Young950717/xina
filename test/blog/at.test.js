/**
 * @description 微博@关系 test
 * @author Young
 */

const server = require('../server')
const { A_COOKIE, Y_COOKIE, A_USERNAME, Y_USERNAME } = require('../testUserInfo')
let blog_id

test('admin @一下young，应该成功', async () => {
    const content = `你好啊young @阳仔 - ${Y_USERNAME}`
    const res = await server
        .post('/api/blog/create')
        .send({
            content
        })
        .set('cookie', A_COOKIE)
    expect(res.body.errNum).toBe(0)
    // 记录微博id
    blog_id = res.body.data.id
})

test('获取Young的 @ 列表，应该有刚刚创建的微博', async () => {
    const res = await server
        .get('/api/atMe/loadMore/0')
        .set('cookie', Y_COOKIE)

    expect(res.body.errNum).toBe(0)
    const data = res.body.data
    const blogList = data.blogList
    const isHaveCurBlog = blogList.some(blog => {
        return blog.id === blog_id
    })
    expect(isHaveCurBlog).toBe(true)
}
)