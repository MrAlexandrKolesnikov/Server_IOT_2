/**
 * Created by sasha on 08/07/2017.
 */
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://root:12345@ds151452.mlab.com:51452/server_iot_db");
var post_data = require('../models/post_data.js');
var uuidv4 = require('uuid/v4');
var time = require('time');
var now = new time.Date();
// post API

exports.createPost = function(userData){
    var post = {
        _id:uuidv4(),
        time: now,
        data: userData
    };
    var postData = new post_data(post);
    return postData.save(function (err, postData) {
        if (err) return console.error(err);
    });
};


exports.getAll = function() {
    return post_data.find({}).then(function(doc){ return Promise.resolve(doc); });
    return Promise.reject("Error wrong");
}
