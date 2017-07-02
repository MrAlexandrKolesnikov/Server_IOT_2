/**
 * Created by sasha on 26/06/2017.
 */
var express = require('express');
//var router = express.Router();
var AsyncRouter = require("express-async-router").AsyncRouter;
var router = AsyncRouter();

/* GET registration page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.redirect('/')
    } else {
        res.render('registration');
    }
});

module.exports = router;