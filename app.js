const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const config = require('./config')
const session = require('express-session')
// const cors = require('cors')
const whiteList = ['/user/createUser','/user/login','/topic/getTopicList','/category/getCategoryList','/comment/getCommentList']



mongoose.connect(config.mongodb.url,{ useNewUrlParser: true })
mongoose.Promise = global.Promise

const app = express()
// 跨域

app.all('*', (req, res, next) => {

  const { origin, Origin, referer, Referer } = req.headers;
	const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Cookie, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
  	res.sendStatus(200);
	} else {
    next();
	}

});
// app.use(cors({ credentials: true, origin: "http://localhost:7000" }))


// 增加session

app.use(cookieParser(config.session.secret));
if(config.session.useRedis) {
	const redisStore = require('connect-redis')(session);
	app.use(session({
		secret: config.session.secret,
		resave: true,
		saveUninitialized:true,
		store: new redisStore({
				host: config.redis.host,
				port: config.redis.port,
				db: config.redis.db,
				pass: '',
		})
	}));
} else {
	const connectMongo = require('connect-mongo')
	const MongoStore = connectMongo(session);
	app.use(session({
		secret: config.session.secret,
		resave: true,
		saveUninitialized: true,
		cookie: { secure: false },
		// maxAge: 3600000 * 24,
		store: new MongoStore({
			url: config.mongodb.url || 'mongodb://localhost:27017/Nobibi'
		})
	}));
}




//session 鉴权
app.use('/api',  (req, res, next) => {
	if(whiteList.indexOf(req.path)<0 && (!req.session.username || !req.cookies.username)) {
		res.send({
			status: 500,
			message: '请重新登录'
		});
	} else {
		next()
	}
})


const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api',routes)
app.listen(port, () => {
  console.log(`dwad listening on port ${port}`)
})