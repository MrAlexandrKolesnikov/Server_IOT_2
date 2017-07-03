var express = require('express');
//var router = express.Router();
//var AsyncRouter = require("express-async-router").AsyncRouter;
//var router = AsyncRouter();
var expressPromiseRouter = require("express-promise-router");
var router = expressPromiseRouter();
var api = require('../api');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        var data = {
            user : req.session.user
        }
        res.render('index', data);
        res.end();
    } else {
        var data = {
            title: 'Express',
        }
        res.render('index', data);
        res.end();
    }
});

module.exports = router;