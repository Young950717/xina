/**
 * @description 个人主页测试用例
 * @author Young
 */

const server = require('../server')
const { Y_COOKIE, Y_USERNAME } = require('../testUserInfo')

test('加载第一页微博 应该成功', async () => {
    const res = await server
        .get(`/api/profile/loadMore/${Y_USERNAME}/0`)
        .set('cookie', Y_COOKIE)
    expect(res.body.errNum).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})