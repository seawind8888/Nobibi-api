import Koa from 'koa';
import mongoose from 'mongoose'
import jwtKoa from 'koa-jwt' 
import middleware from './middleware'
import config from './config'
import api from './routes'
const app = new Koa();
const secret = 'sessionId'


mongoose.Promise = Promise
mongoose.connect("mongodb://localhost:27017/Nobibi", { useNewUrlParser: true }).catch(err => {
  console.log(`[mongoose]${err}`)
})

app.use(middleware())
  //全局路由除了path 以外都需要携带token去请求
  .use(jwtKoa({secret:config.app.secret}).unless({
    path: config.app.whiteList
  }))
  .use(api())
  .listen(config.app.port, () => console.log(`[Nobibi-api] listening on port ${config.app.port}`))

