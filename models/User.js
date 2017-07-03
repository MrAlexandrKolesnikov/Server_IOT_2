var mongoose = require('mongoose');
var User = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    userId:{
        type: String,
        unique: true,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', User);