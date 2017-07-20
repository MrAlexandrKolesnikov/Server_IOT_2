/**
 * Created by sasha on 08/05/2017.
 */

wifiPower = require("./wifiPower.js").wifiPower;

var list_wifiPower = [];

exports.add = function ( id , socket )
{
    console.log(id);
    var device = new wifiPower(socket,id);
    list_wifiPower[id]=device;
};

exports.remove = function (socket)
{
    for (var key in list_wifiPower) {
        var soketDev = list_wifiPower[key].getSocket();
        if(soketDev.id == socket.id)
        {
            delete list_wifiPower[key];
            break;
        }
    }
};

exports.setStatus = function(id , status)
{
    list_wifiPower[id].setStatus(status);
};

exports.getStatus = function( id )
{
    console.log("Get status device #" +id);
    return list_wifiPower[id].getStatus();
};

exports.getIdList = function()
{
    var idList = []
    for (var key in list_wifiPower) {
        if (list_wifiPower.hasOwnProperty(key)) {
            idList.push(key);
        }
    }
    return idList;
}

exports.getNumberOfDevice = function () {
    var count = 0;
    for(var prs in list_wifiPower)
    {
        if(list_wifiPower.hasOwnProperty(prs)) count++;
    }
    console.log("Number Of Device:" + count);
    return count;
}
