/**
 * Created by sasha on 08/07/2017.
 */
function initMap() 
{
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(function(position) 
        {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

            var uluru = {lat: lat , lng: lng};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
            });
            var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Hello World!'
            });

        })
    }
}