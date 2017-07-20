/**
 * Created by sasha on 09/04/2017.
 */

var idDevice = 0;

function onStart()
{
    var request = new XMLHttpRequest();
    request.open("POST", 'remout/getIdList', true);
    request.send();
    request.onreadystatechange = function ()
    {
        if (request.readyState == 4)
        {
            var listOfIdDevice = request.responseText.split(",")
            idDevice = listOfIdDevice[0];
            for(var i = 0 ; i < listOfIdDevice.length ; i++)
            {
                var x = document.getElementById("deviceId");
                var option = document.createElement("option");
                option.text = listOfIdDevice[i];
                x.add(option);
            }
        }
    }
}

function getStatus(id) {
    $.ajax({
        url: 'remout/getStatus',
        type: 'POST',
        data: {
            device: idDevice
        },
        complete: function (response)
        {
            if(response.status == 200) {
                if (response.responseText == "1") {
                    $("body").animate({color: "#333333"}, 1000);
                    $(".inner cover").animate({backgroundColor: "#FFFFFF"}, 1000);
                }
                else {
                    $("body").animate({color: "#FFFFFF"}, 1000);
                    $(".inner cover").animate({backgroundColor: "#333333"}, 1000);
                }
            }
            else
            {
                console.log("Error get list");
            }
        }
    });
}

$(function()
{
    $('#deviceId').change(function()
    {
        idDevice = $('#deviceId :selected').val();
        getStatus(idDevice);
    });
});


function sendStatus( i )
{
    console.log("senStatus");
    $.ajax({
        url: 'remout/setStatus',
        type: 'POST',
        data: {
            device: idDevice,
            status: i
        },
        complete: function (response)
        {
            console.log(response);
            if (response.status == 200)
            {
                console.log("OK");
                getStatus(idDevice);
            }
            else
            {
                console.log("Error set status");
            }
        }
    });
}