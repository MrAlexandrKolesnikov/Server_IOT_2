/**
 * Created by sasha on 08/05/2017.
 */

wifiPower = require("./wifiPower.js").wifiPower;

var list_wifiPower = {};

exports.add = function ( socket )
{
    var userId = Object.keys(list_wifiPower).length;
    if (!list_wifiPower[userId]) {
        list_wifiPower[userId] = new wifiPower(socket,userId+1);
    }
    else
    {
        console.log("Error");
        console.log(userId);
    }
};

exports.remove = function (socket)
{
    for(var index in list_wifiPower)
    {
       if(list_wifiPower[index].getSocket() == undefined)
       {
           delete list_wifiPower[list_wifiPower[index].getId()];
       }
    }
};

exports.setStatus = function(id , status) {

    for(var index in list_wifiPower)
    {
        if(list_wifiPower[index].getId() == id)
        {
            list_wifiPower[index].setStatus(status);
            break;
        }
    }
};

exports.getStatus = function( id )
{
    console.log("Get status device #" +id);
    for(var index in list_wifiPower)
    {
        if(list_wifiPower[index].getId() == id)
        {
            return list_wifiPower[index].getStatus();
        }
    }
};

exports.getIdList = function()
{
    var idList = [];
    for(var index in list_wifiPower)
    {
        idList.push(list_wifiPower[index].getId());
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
