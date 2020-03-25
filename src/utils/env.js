/**
 * @description 设置环境变量
 * @author Young
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  noDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production'
}