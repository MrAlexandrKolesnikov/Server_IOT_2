/**
 * Created by sasha on 27/06/2017.
 */
var express = require('express');
var list_wifiPower = require('../bin/device/list_wifiPower.js')
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

router.post('/getIdList',function (req , res ,next) {
    res.write( String(list_wifiPower.getIdList()));
    res.end();
});


router.post('/getStatus',function (req , res ,next) {
    res.write( String(list_wifiPower.getStatus(req.body.device)));
    res.end();
});

router.post('/setStatus',function (req , res ,next) {
    console.log(req.body);
    list_wifiPower.setStatus(req.body.device,req.body.status);
    res.status(200).send();
});

module.exports = router;