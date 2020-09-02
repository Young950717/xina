/**
 * @description sequelize实例
 * @author Young
 */


const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')
const { host, user, password, database } = MYSQL_CONF
const { isProd, isTest } = require('../utils/env')

const config = {
    host,
    dialect: 'mysql'
}
if (isTest) {
    config.logging = () => { }
}

// 线上环境使用连接池
if (isProd) {
    config.pool = {
        max: 5, // 连接池中的最大连接数量
        min: 0, // 最小
        idle: 10000 // 最长无响应时间(ms)
    }
}

const seq = new Sequelize(database, user, password, config)

// 测试连接
// seq.authenticate().then(() => {
//   console.log('ok')
// }).catch(() => {
//   console.log('error')
// })
module.exports = seq
