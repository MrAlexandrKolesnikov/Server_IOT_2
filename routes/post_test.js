/**
 * Created by sasha on 29/06/2017.
 */
var express = require('express');
var router = express.Router();
var AsyncRouter = require("express-async-router").AsyncRouter;
var api = require('../api/postApi.js');
//var router = AsyncRouter();

router.get("/", function(req, res, next) {
    if(req.session.user)
    {
        api.getAll().then(function(docs)
        {
            var data = {
                title: 'Express',
                user : req.session.user,
                data_mass: docs
            };
            res.render('post_test',data);
        }).catch(function(error){
            console.log(error);
            return next(error)
        });
    }
    else {
        res.redirect('/registration');
    }
});

router.post('/', function(req, res, next) {
    api.createPost(JSON.stringify(req.body));
    res.status(200).send();
});


module.exports = router;