const http = require('http');
const Koa = require('koa');
const WS = require('ws')
const { koaBody } = require('koa-body');
const app = new Koa();
const router = require('./routers');

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));



app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  };

  const headers = { 'Access-Control-Allow-Origin': '*', };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({...headers});
    try {
      return await next();
    } catch (e) {
      e.headers = {...e.headers, ...headers};
      throw e;
    };
  };

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    };

    ctx.response.status = 204;
  };
});

// app.use(async ctx => {
//   const { method, id } = ctx.request.query;
//   switch (method) {
//     case 'allNicknames':
//         ctx.response.body = allNicknames;
//         return;
//     case 'createTicket':
//       const parse = JSON.parse(ctx.request.body);
//       ticketAll.push({
//         id: parse.id,
//         name: parse.name,
//         description: parse.description,
//         status: parse.status,
//         created: parse.created,
//         });
//         ctx.response.status = 200;
//         return;    
//     case 'editTicket':
//         const dataEdit = JSON.parse(ctx.request.body);
//         const index = ticketAll.findIndex(el => el.id == dataEdit.id);
//           ticketAll[index] = {
//             ...ticketAll[index],
//             ...dataEdit,
//           };
//         ctx.response.status = 200;
//         return;
//     case 'deleteTicket':
//       const ticketIndex = ticketAll.findIndex(el => el.id == id);
//       if (ticketIndex !== -1) {
//         ticketAll.splice(ticketIndex, 1);
//         ctx.response.body = 'удалено';
//         ctx.response.status = 200;
//         return; 
//       } else {
//         ctx.response.status = 404;
//         return;
//       };
//     case 'addNickname':
//         const parseToEdit = JSON.parse(ctx.request.body);
//         const elIndex = allNicknames.findIndex(el => el.name == parseToEdit.name);
//         if (elIndex == -1) {
//           allNicknames.push(parseToEdit);
//           ctx.response.status = 200;
//           return; 
//         } else {
//           ctx.response.status = 404;
//           return;
//         };
//   }
// });

app.use(router())

const server = http.createServer(app.callback());

const port = process.env.PORT || 7070;

const wsServer = new WS.Server({
  server
});

const chat = ['welcome to our chat'];

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    chat.push(message);

    const eventData = JSON.stringify({ chat: [message] });

    Array.from(wsServer.clients)
      .filter(client => client.readyState === WS.OPEN)
      .forEach(client => client.send(eventData));
  });

    ws.send(JSON.stringify({ chat }));
});


server.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log('Server is listening to ' + port);
});



