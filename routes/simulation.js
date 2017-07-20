/**
 * Created by sasha on 09/07/2017.
 */
var express = require('express');
//var router = express.Router();
var AsyncRouter = require("express-async-router").AsyncRouter;
var router = AsyncRouter();
var path = require('path');

var uuidv4 = require('uuid/v4');

/* GET registration page. */
router.get('/', function(req, res, next) {
    var data = {
        id: uuidv4()
    }
    res.render('simulation/wifi_power',data);
});

router.get('/gps', function(req, res, next) {
    res.render('simulation/gps_tracker');
});



module.exports = router;