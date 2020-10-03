/**
 * 格式化时间戳
 * @param {String} timestamp 
 * @param {Object} config { 分割符号，需要不要展示小时，要补0吗 }
 */
function formatTimestamp (timestamp = 0, symbol = '.', needHour = true, fullZero = true) {
    if (!timestamp) return '-'
    let _fullZero = t => {
        if (fullZero && t < 10) {
            return t = `0${t}`
        } else {
            return t
        }
    }
    let date = new Date(timestamp)
    let y = date.getFullYear()
    let m = _fullZero(date.getMonth() + 1)
    let d = _fullZero(date.getDate())
    let h
    let min
    let second
    if (needHour) {
        h = _fullZero(date.getHours())
        min = _fullZero(date.getMinutes())
        second = _fullZero(date.getSeconds())
        return `${y}${symbol}${m}${symbol}${d} ${h}:${min}:${second}`
    }
    return `${y}${symbol}${m}${symbol}${d}`
}

module.exports = {
    formatTimestamp
}