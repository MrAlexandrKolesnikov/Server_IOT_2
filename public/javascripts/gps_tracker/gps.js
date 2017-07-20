/**
 * Created by sasha on 08/07/2017.
 */

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}

function initMap()
{
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            map.setCenter(pos);
        });
    }
    $.ajax({
        url: '/gps/getData',
        type: 'POST',
        data: {
            device: 1
        },
        complete: function (response)
        {
            if(response.status == 200) {
                console.log("send OK");
                console.log(response.responseText);
            }
            else
            {
                console.log("Error send");
            }
        }
    });
    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });
}