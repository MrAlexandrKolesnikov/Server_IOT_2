/**
 * Created by sasha on 16/07/2017.
 */
var XMLHttpRequestPromise = require('xhr-promise');

var xhrPromise = new XMLHttpRequestPromise();

var weather = ["погод"];
var Wait = ["сейчас узнаю"];
var requestString = "http://api.openweathermap.org/data/2.5/weather?q=Гомеле" + "&cnt=16&mode=json&APPID=5320531804abef2a9758742d19073490";
function getWeather()
{
    var xhrPromise = new XMLHttpRequestPromise();
}

exports.weatherTry = function (cmd)
{
    var find_answer = false;
    var data_in = true;
    weather.forEach(function (item)
    {
       if(cmd.indexOf(item) != -1)
       {
           xhrPromise.send({
               method: 'POST',
               url: requestString,
           })
               .then(function (results) {
                   if (results.status !== 200) {
                       throw new Error('request failed');
                   }
                   else
                   {
                       console.log("here-2")
                        console.log(results.responseText);
                   }
               })
               .catch(function (e) {
                   console.log(e);
                   console.error('XHR error');
               });
       }
    });
    console.log("here - 1")
};