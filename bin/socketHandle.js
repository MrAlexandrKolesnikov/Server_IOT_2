/**
 * Created by sasha on 26/06/2017.
 */
var bot = require("./bot/bot.js").getAnswer;
var list_wifiPower = require("./device/list_wifiPower.js");
var Promise = require('bluebird');
var time = require('time');
var now = new time.Date();

var indificate = function (text,socket) {
    var text = text.split( "&" );
    var id = "";
    var identifier = "";
    text.forEach( function ( item )
    {
        if( item.indexOf( "id:" ) != -1 )
        {
            id = item.substring( 3 );
        }
        if( item.indexOf( "identifier:" ) != -1 )
        {
            identifier = item.substring( 11 );
        }
    });
    console.log("ID:" + id);
    console.log("Identifier:" + identifier);
    if(identifier == "wifi_power")
    {
        list_wifiPower.add(id,socket);
    }
}

var botRequest = function (text,socket) {
    var respond = "";
    var device = "";
    var cmd_mass = "";
    var position = "";
    var userId   = "";
    var user_cmd = "";
    var request_string = text;
    var cmd = request_string.split( "***" );
    cmd.forEach( function ( item )
    {
        if( item.indexOf( "user:" ) != -1 )
        {
            user_cmd = item.substring( 5 );
        }
        if( item.indexOf( "device:" ) != -1 )
        {
            device = item.substring( 7 );
        }
        if( item.indexOf("position:") != -1)
        {
            position = item.substring( 9 ).split("&");
        }
        if( item.indexOf("userId:") != -1)
        {
            userId = item.substring( 7 ).split("&");
        }
    });
    // console.log( "User:" + user_cmd + "   device:" + device  +  "   Time:" + now);
    console.log( "User:" + user_cmd + "   device:" + device + " position:" + position + "time:" + now);
    respond = bot( user_cmd , device ).then(
        result =>
        {
            console.log("Bot:" + result);
            socket.emit('fridayRespond',result);
        }
    );
    //console.log("Bot:" + respond);
    //socket.emit('fridayRespond',respond);
}

exports.indificate = indificate;
exports.botRequest = botRequest;