/**
 * @description 加密方法
 * @author
 */

const crypto = require('crypto')

const CRYPTO_KEY = require('../config/secret')

/**
 * md5加密
 * @param {string} psw  需要加密的字符串
 */
function _md5(content) {
    return crypto.createHash('md5').update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content  明文
 */
function doCrypto(content) {
    return _md5(`password=${content}&KEY=${CRYPTO_KEY}`)
}


module.exports = {
    doCrypto
}