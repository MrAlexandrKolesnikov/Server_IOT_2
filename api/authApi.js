var mongoose = require('mongoose');
var crypto = require('crypto');
var db = mongoose.connect("mongodb://root:12345@ds151452.mlab.com:51452/server_iot_db")
var User = require('../models/User.js');
var uuidv4 = require('uuid/v4');
// User API

exports.createUser = function(userData){
    var user = {
        _id:uuidv4(),
        username: userData.name,
        email: userData.email,
        password: hash(userData.password)
    };
    var NewUser = new User(user);
    return NewUser.save(function (err, NewUser) {
        if (err) return console.error(err);
    });
};

exports.getUser = function(id)
{
    return User.findOne(id);
};

exports.checkUser = function(userData) {
    return User.find({email: userData.email})
        .then(function(doc){
            if ( doc[0].password == hash(userData.password) ){
                console.log("User password is ok");
                return Promise.resolve(doc);
            } else {
                return Promise.reject("Error wrong");
            }
        });
    return Promise.reject("Error wrong");
}

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}