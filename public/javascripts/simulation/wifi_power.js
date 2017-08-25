/**
 * Created by sasha on 15/07/2017.
 */
function connect()
{
    //var socket = io.connect('https://stark-headland-63769.herokuapp.com');
    //var socket = io.connect('http://localhost:8888');
    //console.log(IdDevice)
    var socket = io.connect('https://tranquil-stream-82241.herokuapp.com');
    //var socket = io.connect('https://stark-headland-63769.herokuapp.com/');
    socket.emit("indificate","id:" +IdDevice + "&identifier:wifi_power");

    socket.on('news', function (data)
    {
        console.log(data);
        if(data.indexOf("1") != -1)
        {
            $("body").animate({color: "#333333"}, 1000);
            $(".site-wrapper").animate({backgroundColor: "#FFFFFF"}, 1000);
        }
        else
        {
            $("body").animate({color: "#FFFFFF"}, 1000);
            $(".site-wrapper").animate({backgroundColor: "#333333"}, 1000);
        }
    });
}