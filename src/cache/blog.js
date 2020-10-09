/**
 * @description 微博广场缓存
 * @author Young
 */
const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// 缓存前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 
 * @param {Number} pageIndex 
 * @param {Number} pageSize 
 */
async function getSquareCacheList (pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}-${pageSize}`
    const CacheRes = await get(key)
    if (CacheRes) {
        // 有缓存
        return CacheRes
    }
    // 没有缓存,从数据库读
    const SqlRes = await getBlogListByUser({ pageIndex, pageSize })
    // 成功后设置缓存
    set(key, SqlRes, 60)
    return SqlRes
}
module.exports = {
    getSquareCacheList
}