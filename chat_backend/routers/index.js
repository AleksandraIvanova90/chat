const combineRouters = require('koa-combine-routers');

const nickname= require('./nickname/index.js');
const sse = require('./sse/index.js')


const router = combineRouters(
  nickname,
  sse,
);

module.exports = router;