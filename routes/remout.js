/**
 * Created by sasha on 27/06/2017.
 */
var express = require('express');
//var router = express.Router();
var AsyncRouter = require("express-async-router").AsyncRouter;
var router = AsyncRouter();

router.get('/', function(req, res, next) {
    if(req.session.user){
        var data = {
            title: 'Express',
            user : req.session.user
        }
        res.render('remout',data);
    } else {
        res.redirect('/registration');
    }
});


module.exports = router;