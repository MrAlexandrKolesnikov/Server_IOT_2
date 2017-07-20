var express = require('express');
//var router = express.Router();
//var AsyncRouter = require("express-async-router").AsyncRouter;
//var router = AsyncRouter();
var expressPromiseRouter = require("express-promise-router");
var router = expressPromiseRouter();
var api = require('../api/authApi');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        var data = {
            user : req.session.user
        }
        return res.render('index', data);
    } else {
        var data = {
            title: 'Express',
        }
        //return res.status(200).send(); //
        return res.render('index', data);
    }
});

module.exports = router;