/* 
	plotRoute.js
	Contains code for creating a map and calculating a route for a given list of latitudes and longitudes.
	HTML must contain a div with ID "map-canvas" for the map to get slapped into

*/
var map;

function plotRoute(locations){
	map = new google.maps.Map(document.getElementById("map-canvas"), 
						{center: locations[0],
						zoom: 8});
	var directionsService = new google.maps.DirectionsService;
  	var directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);
	
	var waypoints = new Array(locations.length - 1);

	for(var i = 0; i < waypoints.length; i++){
		
		waypoints[i] = {location:locations[i+1], stopover:false};
	}

	calcRoute(locations[0], waypoints, map, directionsService, directionsDisplay);
}

function calcRoute(start, stops, map, directionsService, directionsDisplay) {
  	var request = {
    	origin:start,
    	destination:start,
		travelMode: google.maps.TravelMode.WALKING,
		waypoints: stops,
		optimizeWaypoints: true
	};
	directionsService.route(request, function(result, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
      		directionsDisplay.setDirections(result);
    	}
	});
}