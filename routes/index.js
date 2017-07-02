var express = require('express');
//var router = express.Router();
var AsyncRouter = require("express-async-router").AsyncRouter;
var router = AsyncRouter();

var api = require('../api');
var geoip = require('geoip-lite');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.connection.remoteAddress)
    if(req.session.user){
        var data = {
            user : req.session.user
        }
        res.render('index', data);
    } else {
        var data = {
            title: 'Express',
        }
        res.render('index', data);
    }
});

module.exports = router;