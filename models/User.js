var mongoose = require('mongoose');
var User = new mongoose.Schema({
    _id: {type: String, required: true},
    username : {
        type: String,
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
});

module.exports = mongoose.model('User', User);