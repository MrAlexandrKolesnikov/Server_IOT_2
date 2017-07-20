/**
 * Created by sasha on 20/07/2017.
 */
var mongoose = require('mongoose');
var Gps = new mongoose.Schema({
    _id: {type: String, required: true},
    idDevice:{type:String},
    lat:{type:Number},
    lng:{type:Number}
});

module.exports = mongoose.model('Gps', Gps);