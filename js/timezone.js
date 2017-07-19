$(function() {



})

//Pin point location on google map
function initMap() {
  var uluru = {
    lat: 22.2792,
    lng: 114.1682
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}