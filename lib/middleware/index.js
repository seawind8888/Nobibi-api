import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import cors from 'koa2-cors'
import errorHandle from './errorHandle'

export default function middleware() {
  return convert.compose(
    logger(),
    bodyParser(),
    cors({
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }),
    errorHandle
  )
}