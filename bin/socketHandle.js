/**
 * Created by sasha on 26/06/2017.
 */
var bot = require("./bot/bot.js").getAnswer;
var geoip2 = require('geoip2');
geoip2.init();
var botRequest = function (text,socket) {
    var respond = "";
    var device = "";
    var cmd_mass = "";
    var user_cmd = "";
    var request_string = text;
    var cmd = request_string.split( "***" );
    var clientIp = socket.request.connection.remoteAddress;
    geoip2.lookupSimple(clientIp, function(error, result) {
        if (error) {
            console.log("Error: %s", error);
        }
        else if (result) {
            console.log(result);
        }
    });
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
    });

    // console.log( "User:" + user_cmd + "   device:" + device  +  "   Time:" + now);
    console.log( "User:" + user_cmd + "   device:" + device);
    respond = bot( user_cmd , device );
    console.log("Bot:" + respond);
    socket.emit('fridayRespond',respond);
}

exports.botRequest = botRequest;