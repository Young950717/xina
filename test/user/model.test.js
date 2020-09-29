/**
 * @description user model test 用户模型测试
 * @author Young
 */

const User = require('../../src/db/model/User')

test('用户模型测试', () => {
    // build会构建一个user实例 但是不会提交到数据库中
    const user = User.build({
        userName: 'zhangsan',
        password: '123456',
        nickName: '张三',
        // gender: 1,
        picture: 'xxx.png',
        city: '北京'
    })
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('123456')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('xxx.png')
    expect(user.city).toBe('北京')
})