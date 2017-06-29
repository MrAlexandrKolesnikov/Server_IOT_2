/**
 * Created by sasha on 26/06/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.user){
        var data = {
            title: 'Express',
            user : req.session.user
        }
        res.render('temperature',data);
    } else {
        res.redirect('/');
    }
});

module.exports = router;