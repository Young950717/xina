/**
 * @description 连接redis的方法 get set
 * @author Young
 */
const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 * redis get方法
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间(ms)
 */
let set = (key, val, timeout = 60 * 60) => {
  val = typeof val === 'object' ? JSON.stringify(val) : val
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * redis set方法
 * @param {string} key 
 */
let get = key => {
  return new Promise((reslove, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        reslove(null)
        return
      }
      try {
        reslove(JSON.parse(val))
      } catch (error) {
        reslove(val)
      }
    })
  })
}

module.exports = {
  set
}