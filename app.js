var http = require('http'),
    express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var jsSHA = require('jssha');
var jsapi_ticket,noncestr,timestamp,url;
var index = require('./routes/index');
var jssdk = require('./routes/jssdk');
var token = require('./routes/wxtoken');

//跨域函数
function allowOrigin(req,res,next){
  console.log('allowOrigin')
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' mengxt')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
}

//设置跨域访问
app.all('/token', allowOrigin);
app.all('/jssdk',allowOrigin)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(index);
app.use(token);
app.use(jssdk);

app.listen(3030,function(){
  console.log('Example app listening at port 3030');
})