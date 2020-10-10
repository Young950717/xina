/**
 * @description 用户关系 单元测试
 * @author Young
 */

const server = require('../server')
const { getFans, getFollower } = require('../../src/controller/user-relation')
const {
    Y_COOKIE,
    Y_USERNAME,
    Y_ID,
    A_COOKIE,
    A_USERNAME,
    A_ID
} = require('../testUserInfo')

test('无论如何，Young取消关注admin 应该成功', async () => {
    const res = await server
        .post('/api/profile/unfollow')
        .send({ userId: A_ID })
        .set('cookie', Y_COOKIE)
    expect(1).toBe(1)
})
test('Young关注admin 应该成功', async () => {
    const res = await server
        .post('/api/profile/follow')
        .send({ userId: A_ID })
        .set('cookie', Y_COOKIE)
    expect(res.body.errNum).toBe(0)
})
// 获取粉丝
test('获取admin的粉丝 应该有Young', async () => {
    const res = await getFans(A_ID)
    const { count, fansList } = res.data

    const hasFans = fansList.some(o => {
        return o.userName === Y_USERNAME
    })
    expect(count > 0).toBe(true)
    expect(hasFans).toBe(true)
})

// 获取关注人
test('获取Young的关注者 应该有admin', async () => {
    const res = await getFollower(Y_ID)
    const { count, followerList } = res.data
    const hasFollowed = followerList.some(o => {
        return o.userName === A_USERNAME
    })
    expect(count > 0).toBe(true)
    expect(hasFollowed).toBe(true)
})

// 取消关注
test('Young取消关注admin 应该成功', async () => {
    const res = await server
        .post('/api/profile/unfollow')
        .send({ userId: A_ID })
        .set('cookie', Y_COOKIE)
    expect(res.body.errNum).toBe(0)
})