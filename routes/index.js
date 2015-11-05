var express = require('express');
	router = express.Router();

module.exports = router.get('/',function(req, res){
	res.render('index',{title: 'express'});
})