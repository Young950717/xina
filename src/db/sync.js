/**
 * @description sequelize同步数据库
 * @author Young
 */


const seq = require('./seq')
// require('./model/index')


// 测试连接
seq.authenticate().then(() => {
    console.log('ok')
}).catch(() => {
    console.log('error')
})
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()

})