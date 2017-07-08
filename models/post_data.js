/**
 * Created by sasha on 08/07/2017.
 */
var mongoose = require('mongoose');
var post = new mongoose.Schema({
    _id: {type: String, required: true},
    data : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', post);