/**
 * @description res 的数据模型
 * @author Young
 */

/**
 * 基础模块
 */
class BaswModel {
    constructor({ errNum, data, msg }) {
        this.errNum = errNum
        if (data) {
            this.data = data
        }
        if (msg) {
            this.msg = msg
        }
    }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaswModel {
    constructor(data = {}) {
        super({
            errNum: 0,
            data
        })
    }
}

/**
* 失败的数据模型
*/
class ErrorModel extends BaswModel {
    constructor({ errNum, msg }) {
        super({
            errNum,
            msg
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}