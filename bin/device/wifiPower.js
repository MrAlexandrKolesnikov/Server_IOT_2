/**
 * Created by sasha on 08/04/2017.
 */

var _device = require("./device.js").prototype, method = wifiPower.prototype = Object.create(_device);

method.constructor = wifiPower;

function wifiPower( socket , id )
{
    this.status = 1;
    _device.constructor.apply(this,[socket,id])
}

method.setStatus = function( i )
{
    this.status = i;
    this._socket.emit('news', i);
}

method.getStatus = function()
{
    return this.status;
}

method.getSocket = function () {
    return this._socket
}
exports.wifiPower = wifiPower;



