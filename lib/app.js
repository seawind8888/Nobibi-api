import Koa from 'koa';
import Router from 'koa-router'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
// import mongoose from 'mongoose'

import jwtKoa from 'koa-jwt'//验证token
import fs from 'fs'
import path from 'path'
import routes from './routes/index.js'
import errorHandle from './middleware/errorHandle'
import config from './config'
// import connectMongo from './db'

const app = new Koa();
const secret =  'sessionId' //生成Token 的秘钥
const models = path.join(__dirname, './lib/models');
const router = new Router();

// mongoose.Promise = Promise
// mongoose.connect("mongodb://localhost:27017/Nobibi", { useNewUrlParser: true });
// connectMongo("mongodb://localhost:27017/Nobibi")

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

app.use(errorHandle)
  .use(cors())
  .use(bodyParser())
  //全局路由除了path 以外都需要携带token去请求
  .use(jwtKoa({secret:secret}).unless({
    path: config.app.whiteList
}))

router.use('/api',routes.routes())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.app.port, () => console.log(`[Nobibi-api] listening on port ${config.app.port}`))

