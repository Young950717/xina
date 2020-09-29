/**
 * @description 登录接口单元测试
 * @author Young
 */
// const server = require('../server')

// 用户信息
// const userName = `u_${Date.now()}`
// const password = `p_${Date.now()}`
// const testUser = {
//     userName,
//     password,
//     gender: 1,
//     nickName: userName
// }

// let COOKIE = ''

// test('注册一个用户', async () => {
//     const res = await server
//         .post('/api/user/register')
//         .send(testUser)
//     console.log(res.body)
//     expect(res.body.errNum).toBe(0)
// })
// test('重复注册', async () => {
//     const res = await server.post('/api/user/register')
//         .send(testUser)
//     expect(res.body.errNum).not.toBe(0)
// })
// test('验证用户名是否存在', async () => {
//     const res = await server.post('/api/user/isExist')
//         .send({ userName })
//     expect(res.body.errNum).toBe(0)
// })
// test('json schema 检验非法注册数据', async () => {
//     const res = await server.post('/api/user/register')
//         .send({
//             userName: '123',
//             password: '1',
//             gender: 'male'
//         })
//     expect(res.body.errNum).not.toBe(0)
// })
// test('登录应该成功', async () => {
//     const res = await server.post('api/user/login')
//         .send({ userName, password })

//     expect(res.body.errNum).toBe(0)
//     // 获取cookie
//     COOKIE = res.headers['set-cookie'].join(';')
// })
// test('删除自己', async () => {
//     const res = await server.post('api/user/delete')
//         .set('cookie', COOKIE)
//     expect(res.body.errNum).toBe(0)
// })
// test('再次查询用户，用户名应该不存在', async () => {
//     const res = await server.post('/api/user/isExist')
//         .send({ userName })
//     expect(res.body.errNum).not.toBe(0)
// })