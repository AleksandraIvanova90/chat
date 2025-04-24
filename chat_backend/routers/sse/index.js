const Router = require('koa-router');
const { streamEvents } = require('http-event-stream');
const { v4 } = require('uuid');
const users = require('../../db/index.js');

const router = new Router();

router.get('/sse', async (ctx) => {
  streamEvents(ctx.req, ctx.res, {
    async fetch(lastEventId) {
      console.log(lastEventId);
      
      return [];
    },
    
    async stream(sse) {
      users.listen((item) => {
        sse.sendEvent({
          id: v4(),
          data: JSON.stringify(item),
        });
      });
      // sse.sendEvent({
      //   id: v4(),
      //   data: JSON.stringify(users)
      // })

      return () => {};
    }
  });
  
  ctx.respond = false;
});

module.exports = router;