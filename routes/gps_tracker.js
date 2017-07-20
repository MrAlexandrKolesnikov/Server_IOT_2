/**
 * Created by sasha on 19/07/2017.
 */
var express = require('express');
//var router = express.Router();
var AsyncRouter = require("express-async-router").AsyncRouter;
var router = AsyncRouter();
var api = require('../api/gpsApi.js');

router.get('/', function(req, res, next) {
    if(req.session.user){
        var data = {
            title: 'Express',
            user : req.session.user,
            id: req.session.id
        }
        res.render('gps_tracker',data);
    } else {
        res.redirect('/registration');
    }
});

router.post('/',function (req , res , next)
{
    console.log(req.body);
    api.createGps(req.body);
    res.status(200).send();
});

router.post('/getData',function (req , res , next)
{
    console.log("get gps data");
    console.log("device:" + req.body.device)
    api.getDeviceByID(req.body.device).then(function(docs)
    {
        //console.log(docs)

        res.status(200).send();
    }).catch(function(error){
        console.log(error);
        res.status(200).send();
        return next(error)
    });
    res.status(200).send();
});
module.exports = router;