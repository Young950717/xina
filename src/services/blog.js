/**
 * @description 微博 service
 * @author Young
 */


const { Blog } = require('../db/model/index')



/**
 * db 创建微博
 * @param {String} userId 
 * @param {String} content 
 * @param {String} image 
 */
async function createBlog (userId, content, image) {
    const res = await Blog.create({
        userId,
        content,
        image
    })
    return res.dataValues
}
module.exports = {
    createBlog
}