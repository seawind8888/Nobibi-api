// const pkg = require('../package')
const express = require('express')
const cookieParser = require('cookie-parser')
const  bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')

mongoose.connect("mongodb://localhost:27017/vueAdmin",{ useNewUrlParser: true })
mongoose.Promise = global.Promise

const app = express()
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
  	res.sendStatus(200);
	} else {
    next();
	}
});

const port = process.env.PORT || 3001
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api',routes)
app.listen(port, () => {
  console.log(`dwad listening on port ${port}`)
})