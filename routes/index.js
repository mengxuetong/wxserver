var express = require('express');
	router = express.Router();

module.exports = router.get('/',function(req, res){
	res.render('index',{title: 'Node微信jssdk服务器'});
})