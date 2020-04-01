/**
 * @description 封装seq数据类型
 * @author Young
 */

 const Sequelize = require('sequelize')
 module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN
 }