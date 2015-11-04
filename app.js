var http = require('http'),
    wechat = require('node-wechat')("mengxt"),
    express = require('express'),
    jsSHA = require('jssha');
var app = express();
var jsapi_ticket,noncestr,timestamp,url;

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.all("/token",allRequest);

function allRequest(req,res,next){
  //检验 token
  wechat.checkSignature(req, res);
  //预处理
  wechat.handler(req, res);

  //链式监听
  wechat.text(function (data) {
    // TODO
  }).image(function (data) {
    // TODO
  }).location(function (data) {
    // TODO
  }).link(function (data) {
    // TODO
  }).event(function (data) {
    // TODO
  }).voice(function (data) {
    // TODO
  }).video(function (data) {
    // TODO
  }).all(function (data) {
    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "news",
      Articles : [
        {
          Title: "习近平印尼国会演讲 向现场观众问好:阿巴嘎坝",
          Description: "央广网雅加达10月3日消息 北京时间3日上午11时许，正在印度尼西亚进行国事访问的中国国家主席习近平，在印尼国会发表重要演讲，阐述如何进一步促进双边关系、中国与东盟关系发展的构想，以及中国和平发展的理念。",
          PicUrl: "http://news.cnr.cn/special/xjp4/zb/zy/201310/W020131003454716456595.jpg",
          Url: "http://news.cnr.cn/special/xjp4/zb/zy/201310/t20131003_513743132.shtml"
        },
        {
          Title: "九寨沟：少数游客拦车翻栈道致交通瘫痪",
          Description: "10月2日，九寨沟发生大规模游客滞留事件。因不满长时间候车，部分游客围堵景区接送车辆，导致上下山通道陷入瘫痪。大批游客被迫步行十几公里下山，包括80岁老人及9个月小孩。入夜后，游客围住售票处要求退票，并一度“攻陷”售票处。10月3日凌晨，九寨沟管理局、阿坝大九旅集团九寨沟旅游分公司发致歉书向游客致歉。",
          PicUrl: "http://www.chinadaily.com.cn/dfpd/shehui/attachement/jpg/site1/20131003/a41f726719b213b7156402.jpg",
          Url: "http://www.chinadaily.com.cn/dfpd/shehui/2013-10/03/content_17008311.htm"  
        },
        {
          Title: "美政府关门第二天 官民高呼“伤不起”",
          Description: "中新社华盛顿10月2日电 (记者 张蔚然)美国政府“关门”进入第二天，白宫与国会对峙僵局未破，美国继续在“喊话”模式中运转。越来越多的联邦部门和民众都在抱怨“伤不起”，调门越喊越高。",
          PicUrl: "http://i1.hexunimg.cn/2013-10-03/158486762.jpg",
          Url: "http://www.chinanews.com/gj/2013/10-03/5343908.shtml?f=baidu"
        }
      ]
    }
    wechat.send(msg);
  });
}

app.get('/jssdk',function(req,res){
  console.log('enter jssdk')
  http.get('http://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxdd42174ce7038c28&secret=d4624c36b6795d1d99dcf0547af5443d', function(_res) {
   // 这个异步回调里可以获取access_token
   console.log(_res);
   var access_token = _res.access_token;
   
   http.get('http://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=access_token&type=jsapi', function(_res){
     // 这个异步回调里可以获取ticket
     console.log(_res)
     jsapi_ticket = _res.ticket;
     var createNonceStr = function () {
        return Math.random().toString(36).substr(2, 15);
      };

      var createTimestamp = function () {
        return parseInt(new Date().getTime() / 1000) + '';
      };

      var raw = function (args) {
        var keys = Object.keys(args);
        keys = keys.sort()
        var newArgs = {};
        keys.forEach(function (key) {
          newArgs[key.toLowerCase()] = args[key];
        });

        var string = '';
        for (var k in newArgs) {
          string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
      };

      /**
      * @synopsis 签名算法 
      *
      * @param jsapi_ticket 用于签名的 jsapi_ticket
      * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
      *
      * @returns
      */
      var sign = function (jsapi_ticket, url) {
        var ret = {
          jsapi_ticket: jsapi_ticket,
          nonceStr: createNonceStr(),
          timestamp: createTimestamp(),
          url: url
        };
        var string = raw(ret);
            jsSHA = require('jssha');
            shaObj = new jsSHA(string, 'TEXT');
        ret.signature = shaObj.getHash('SHA-1', 'HEX');

        return ret;
      };
      res.json(sign());
      //module.exports = sign;
    });
  });
})
app.listen(3030,function(){
  console.log('Example app listening at port 3030');
})

// var server = http.createServer(function (req, res) {
  

// }).listen(3030,function(){
// 	 var host = server.address().address;
//   	var port = server.address().port;
//   	console.log('Example app listening at http://%s:%s', host, port);
// });