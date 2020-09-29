/**
 * @description json schema 校验
 * @author Young
 */
const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true 
})
/**
 * 
 * @param {Object} schema json schema 规则
 * @param {Object} data 要检验的对象
 */
function validate (schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}
module.exports = validate