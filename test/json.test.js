/**
 * @description json test
 * @author Young
 */

 const server = require('./server')

 test('json 返回格式正确',async ()=>{
   const res = await server.get('/json')
   expect(res.body).toEqual({
    title: 'koa2 json',
   })
   expect(res.body.title).toBe('koa2 json')
 })