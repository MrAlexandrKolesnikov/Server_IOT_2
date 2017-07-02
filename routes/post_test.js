/**
 * Created by sasha on 29/06/2017.
 */
var express = require('express');
//var router = express.Router();
var AsyncRouter = require("express-async-router").AsyncRouter;
var router = AsyncRouter();
var api = require('../api');

var post_data = []

router.get("/", function(req, res, next) {
    if(req.session.user){
        var data = {
            title: 'Express',
            user : req.session.user,
            data_mass: post_data
        }
        res.render('post_test',data);
    } else {
        res.redirect('/registration');
    }
});

router.post('/', function(req, res, next) {
    var string = (req.body);
    post_data[post_data.length] =  string;
    res.status(200).send();
});


module.exports = router;