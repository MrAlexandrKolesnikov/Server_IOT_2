/**
 * Created by sasha on 08/07/2017.
 */

function placeMarkerAndPanTo(latLng, map)
{
    $.ajax({
        url: '/gps',
        type: 'POST',
        data: {
            device: 1,
            lat: latLng.lat(),
            lng: latLng.lng()
        },
        complete: function (response)
        {
            if(response.status == 200) {
                console.log("send OK");
            }
            else
            {
                console.log("Error send");
            }
        }
    });
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });

}

function initMap()
{
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 53.55, lng: 27.33},
    });

    map.addListener('click', function(e)
    {
        placeMarkerAndPanTo(e.latLng, map);
    });
}
