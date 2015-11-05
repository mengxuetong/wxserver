var http = require('http'),
    express = require('express');
var app = express();
var jsSHA = require('jssha');
var jsapi_ticket,noncestr,timestamp,url;
var jssdk = require('./routes/jssdk');
var token = require('./routes/wxtoken');
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use("/token",token);
app.use('/jssdk',jssdk);

app.listen(3030,function(){
  console.log('Example app listening at port 3030');
})