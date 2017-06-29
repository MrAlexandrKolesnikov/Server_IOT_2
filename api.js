var mongoose = require('mongoose');
var crypto = require('crypto');
var db = mongoose.connect("mongodb://root:12345@ds032340.mlab.com:32340/server_iot_db")
var User = require('./models/User.js');

// User API

exports.createUser = function(userData){
    console.log('create User');
    console.log(userData)
    var user = {
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