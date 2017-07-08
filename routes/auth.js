var express = require('express');
var router = express.Router();
var api = require('../api.js');
//var AsyncRouter = require("express-async-router").AsyncRouter;
//var router = AsyncRouter();
/* Создание пользователя */
router.post('/login', function(req, res, next) {
    if (req.session.user) return res.redirect('/');
    else
    {
        api.checkUser(req.body).then(function(user)
        {
            if(user[0]){
                req.session.user = { id: user[0]._id,name: user[0].username, password: user[0].password};
                res.redirect('/');
            } else {
                return next(error)
            }
        })
        .catch(function(error){
            console.log(error);
            return next(error)
        })
    }
});

router.post('/registr', function(req, res, next) {
    api.createUser(req.body)
        .then(function(result){
            res.redirect(307,'/auth/login');
        })
        .catch(function(err){
            if (err.toJSON().code == 11000){
                res.status(500).send("This email already exist")
            }
        })
});
router.post('/logout', function(req, res, next) {
    if (req.session.user) {
        req.session.destroy(function() {
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    }
});
module.exports = router;