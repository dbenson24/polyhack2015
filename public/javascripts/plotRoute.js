/* 
	plotRoute.js
	Contains code for creating a map and calculating a route for a given list of latitudes and longitudes.
	HTML must contain a div with ID "map-canvas" for the map to get slapped into

*/
var map;

var skeletonMarker;

var skeletonRoute = null;

var image = 'images/small_skull.png';
//var image = '../public/images/skeleton_anim_angry.gif';

function plotRoute(locations){
	for (var n = 0; n < locations.length; n ++) {
		locations[n].lat = parseFloat(locations[n].lat);
		locations[n].lng = parseFloat(locations[n].lng);
	}
	map = new google.maps.Map(document.getElementById("map"), 
						{center: locations[0],
						zoom: 8});
	var directionsService = new google.maps.DirectionsService;
  	var directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);
	
	var waypointSize = locations.length;
	
	if (locations.length >= 9) {
		waypointSize = 8;	
	}
	var waypoints = new Array(waypointSize);
	
	for(var i = 0; i < waypoints.length && i < 8; i++){
		waypoints[i] = {location:locations[i+1], stopover:true};
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
    		skeletonRoute = result;
      		directionsDisplay.setDirections(result);
      		skeletonMarker = new google.maps.Marker({position:start, map:map, icon:image});
      		animateSkelly(skeletonMarker, skeletonRoute, 0, 0, 0, 0, 0)
    	}
	});
}

//to get discrete points from route, use route[0].legs[0].steps[0].path[0];


function plopMarkers(){
	console.log(skeletonRoute);
	
	for(var route = 0; route < skeletonRoute.routes.length; route++){
		for(var leg = 0; leg < skeletonRoute.routes[route].legs.length; leg++){
			for(var step = 0; step < skeletonRoute.routes[route].legs[leg].steps.length; step++){
				for(var latlng = 0; latlng < skeletonRoute.routes[route].legs[leg].steps[step].path.length; latlng++){
					new google.maps.Marker({position:skeletonRoute.routes[route].legs[leg].steps[step].path[latlng], map:map, icon:image});
					//skeletonMarker({position:skeletonRoute.routes[route].legs[leg].steps[step].path[latlng]});
				}
			}
		}
	}

}

function animateSkelly(yourmarker,yourroute,route,leg,step,latlng, step) {
	var prevLoc = yourroute.routes[route].legs[leg].steps[step].path[latlng];
	latlng++;
	if (latlng >= yourroute.routes[route].legs[leg].steps[step].path.length){
		latlng = 0;
		step++;
	}
	if (step >= yourroute.routes[route].legs[leg].steps.length){
		step = 0;
		leg++;
	}
	if (leg >= yourroute.routes[route].legs.length){
		leg = 0;
		route++;
	}
	if (route >= yourroute.routes.length){
		route = 0;
	}
	var nextLoc = yourroute.routes[route].legs[leg].steps[step].path[latlng];
	
	skeletonMarker.setPosition(lerp(prevLoc, nextLoc, step));
    window.setTimeout(function(){
        animateSkelly(yourmarker,yourroute,route,leg,step,latlng, (step+0.1)%1);
    },500);
}

function lerp(latlngA, latlngB, n){
	var lat = (n*latlngB.lat+(1-n)*latlngA.lat)/2;
	var lng = (n*latlngB.lng+(1-n)*latlngA.lng)/2;
	return {lat, lng};
}