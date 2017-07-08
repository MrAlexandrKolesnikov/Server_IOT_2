/**
 * Created by sasha on 29/06/2017.
 */
var express = require('express');
//var router = express.Router();
var AsyncRouter = require("express-async-router").AsyncRouter;
var router = AsyncRouter();
var api = require('../api');
var post_data = require('../models/post_data.js');
var uuidv4 = require('uuid/v4');

var dataRend;
router.get("/", function(req, res, next) {
    if(req.session.user)
    {

        var data = {
            title: 'Express',
            user: req.session.user,
            data_mass: dataRend
        };
        res.render('post_test',data);

    }
    else {
        res.redirect('/registration');
    }
});

router.post('/', function(req, res, next) {
    var string = JSON.stringify(req.body);
    console.log(string);
    var post = {
        _id:uuidv4(),
        data: string
    };
    var postData = new post_data(post);
    postData.save(function (err) {
        if (err) return console.error(err);
    });
    post_data.find({}, function(err, docs ) {
        if (err) return next(err);
        dataRend = docs;
    });
    res.status(200).send();
});


module.exports = router;