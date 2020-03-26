/**
 * @description jest server
 * @author Young
 */

 const request = require('supertest')
 const server = require('../src/app').callback()

 module.exports = request(server)

 