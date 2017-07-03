/**
 * Created by sasha on 26/06/2017.
 */
var bot = require("./bot/bot.js").getAnswer;

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
    console.log( "User:" + user_cmd + "   device:" + device);
    respond = bot( user_cmd , device );
    console.log("Bot:" + respond);
    socket.emit('fridayRespond',respond);
}

exports.botRequest = botRequest;