/**
 * @description 微博相关 单元测试
 * @author Young
 */
const Blog = require('../../src/db/model/Blog')

test('微博模型测试', () => {
    const blog = Blog.build({
        userId: 1,
        content: '123456',
        image: 'xxx.png'
    })
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('123456')
    expect(blog.image).toBe('xxx.png')
})