/**
 * @description 存储配置
 * @author Young
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}
let MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'koa2_weibo_db'
}

if (isProd) {
    REDIS_CONF = {
        // 线上redis配置
        port: 6379,
        host: '127.0.0.1'
    }
    MYSQL_CONF = {
        // 线上mysql配置
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'koa2_weibo_db'
    }
}
module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}