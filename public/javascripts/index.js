// Generated by CoffeeScript 1.7.1
(function() {
  var map, myOptions, yourLocation;

  yourLocation = new google.maps.LatLng(42.4019, -71.1193);

  myOptions = {
    zoom: 13,
    center: yourLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map"), myOptions);

}).call(this);
