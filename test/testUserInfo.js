/**
 * @description 单元测试需要的用户信息
 * @author Young
 */

/* 
 cookie是用户的敏感信息，此处只是应用在**测试**用户的cookie
 每次测试用户重新登录 都要更新此处cookie
*/


const COOKIE = 'weibo.sid=8g-plGex2b_GBS7IHuFhari2WoWRo5dW; weibo.sid.sig=aejJVAulpl6Zsei8ZRrkcMqGlQQ'
const USERNAME = 'young'
module.exports = {
    COOKIE,
    USERNAME
}