/**
 * Created by sasha on 20/07/2017.
 */
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://root:12345@ds151452.mlab.com:51452/server_iot_db");
var gps_data = require('../models/gps.js');
var uuidv4 = require('uuid/v4');
var time = require('time');
var now = new time.Date();
// post API

exports.createGps = function(userData){
    var post = {
        _id:uuidv4(),
        idDevice: userData.device,
        time: now,
        lat: userData.lat,
        lng: userData.lng
    };
    var gpsData = new gps_data(post);
    return gpsData.save(function (err, gpsData) {
        if (err) return console.error(err);
    });
};


exports.getAll = function() {
    return gps_data.find({}).then(function(doc){ return Promise.resolve(doc); });
    return Promise.reject("Error wrong");
}


exports.getDeviceByID = function(id) {
    return gps_data.find({idDevice:id}).then(function(doc){
        return Promise.resolve(doc); });
    return Promise.reject("Error wrong");
}