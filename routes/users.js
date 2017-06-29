var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();
var api = require('../api.js')

/* Создание пользователя */
router.post('/login', function(req, res, next) {
    if (req.session.user) return res.redirect('/');
    else
    {
        api.checkUser(req.body).then(function(user)
        {
            if(user[0]){
                req.session.user = {id: user[0]._id, name: user[0].username,password: user[0].password};
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

router.post('/', function(req, res, next) {
    api.createUser(req.body)
        .then(function(result){
            console.log("User created")
            res.redirect(307,'/users/login');
        })
        .catch(function(err){
            if (err.toJSON().code == 11000){
                res.status(500).send("This email already exist")
            }
        })
});

router.get('/logout', function(req, res, next) {
    console.log("Logout");
    if (req.session.user) {
        delete req.session.user;
        res.render('index')
    }
});

module.exports = router;