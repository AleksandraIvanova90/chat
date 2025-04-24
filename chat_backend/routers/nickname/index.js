const Router = require('koa-router');
const users = require('../../db/index.js')

const router = new Router();

  router.post('/nickname', (ctx) => {
     
    ctx.response.body = 'nickname';
  
    const data = ctx.request.body;

    console.log(data)
  
    ctx.response.set('Access-Control-Allow-Origin', '*');
    const elIndex = users.data.some(el => el.name == data.name);
    console.log(elIndex)
    if (elIndex == false) {
      users.add(data);
      ctx.response.status = 200;
      return; 
    } else {
      ctx.response.status = 404;
      return;
    };
  });

  module.exports = router;