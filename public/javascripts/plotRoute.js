/* 
	plotRoute.js
	Contains code for creating a map and calculating a route for a given list of latitudes and longitudes.
	HTML must contain a div with ID "map-canvas" for the map to get slapped into

*/
var map;

var skeletonMarker;

var skeletonRoute = null;

var images = [];

var waypointMarkers = [];

var move = true;

function getImages(){
	for(var i = 0; i < 100; i++){
		if(i<10)
			images.push('images/skeleton_anim_angry/skeleton head_front [angry]_0000'+i+'.png');
		else
			images.push('images/skeleton_anim_angry/skeleton head_front [angry]_000'+i+'.png');
	}
}

function plotRoute(locations) {
	
	getImages();
	for (var n = 0; n < locations.length; n++) {
		locations[n].lat = parseFloat(locations[n].lat);
		locations[n].lng = parseFloat(locations[n].lng);
	}
	map = new google.maps.Map(document.getElementById("map"), {
		center: locations[0],
		zoom: 8
	});
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);

	var waypointSize = locations.length;

	if (locations.length >= 9) {
		waypointSize = 8;
	}
	var waypoints = new Array(waypointSize);

	for (var i = 0; i < waypoints.length && i < 8; i++) {
		waypoints[i] = {
			location: locations[i + 1],
			stopover: true
		};
		
		console.log(locations[i].text);
			
		waypointMarkers.push(
			makeMarker(map, locations[i].lat, locations[i].lng, locations[i].title + ": " + locations[i].text));
	}
	

	calcRoute(locations[0], waypoints, map, directionsService, directionsDisplay, locations);
}

function calcRoute(start, stops, map, directionsService, directionsDisplay, locations) {
	var request = {
		origin: start,
		destination: start,
		travelMode: google.maps.TravelMode.WALKING,
		waypoints: stops,
		optimizeWaypoints: true,
	};


	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			skeletonRoute = result;
			directionsDisplay.setOptions({suppressMarkers: true});
			directionsDisplay.setDirections(result);
			skeletonMarker = new google.maps.Marker({
				position: start,
				map: map,
				icon: images[0]
			});

			var route = 0;
			var leg = 0;
			var step = 0;
			var latlng = 0;
			var prevLoc;
			var nextLoc;
			var iter = 1;
			var frame = 0;
			var dist = 0;
			
			function nextAddress(){
				latlng++;
				if (latlng >= skeletonRoute.routes[route].legs[leg].steps[step].path.length) {
					latlng = 0;
					step++;
				}
				if (step >= skeletonRoute.routes[route].legs[leg].steps.length) {
					step = 0;
					leg++;
					move = false;
					//window.writeText(locations.sentence, selector, rate, moveToNext);
				}
				if (leg >= skeletonRoute.routes[route].legs.length) {
					leg = 0;
					route++;
				}
				if (route >= skeletonRoute.routes.length) {
					route = 0;
				}
				nextLoc = skeletonRoute.routes[route].legs[leg].steps[step].path[latlng];
				dist = google.maps.geometry.spherical.computeDistanceBetween(prevLoc, nextLoc);
			}
			
			function animateSkelly() {
				
				frame++;
				frame %= 100;
				
				if(iter >= 1){
					iter = 0;
					if(move){
						prevLoc = skeletonRoute.routes[route].legs[leg].steps[step].path[latlng];
						nextAddress();
					
						//if(dist<10)
							//nextAddress();
					} else{
						move = true;
					}
				}
				
				if(move)
					iter +=1/dist;
				else
					iter += 0.1;
				//console.log(iter);
				if(move)
					skeletonMarker.setPosition(google.maps.geometry.spherical.interpolate(prevLoc, nextLoc, iter));
				skeletonMarker.setIcon(images[frame]);
			}
			window.setInterval(animateSkelly, 50);
		}
	});
}


//to get discrete points from route, use route[0].legs[0].steps[0].path[0];


function plopMarkers() {
	//var infowindow = new google.maps.InfoWindow();
	console.log(skeletonRoute);

	for (var route = 0; route < skeletonRoute.routes.length; route++) {
		for (var leg = 0; leg < skeletonRoute.routes[route].legs.length; leg++) {
			for (var step = 0; step < skeletonRoute.routes[route].legs[leg].steps.length; step++) {
				for (var latlng = 0; latlng < skeletonRoute.routes[route].legs[leg].steps[step].path.length; latlng++) {
					var marker = new google.maps.Marker({
						position: skeletonRoute.routes[route].legs[leg].steps[step].path[latlng],
						map: map,
						//icon: image
					});
					//google.maps.event.addListener(marker, 'click', function() {
					//infowindow.setContent(marker.title);
					//infowindow.open(map, marker);
			//	});
					skeletonMarker({position:skeletonRoute.routes[route].legs[leg].steps[step].path[latlng]});
				}
			}
		}
	}

}


function lerp(latlngA, latlngB, n) {
	var latitude = (n * latlngB.lat() + (1 - n) * latlngA.lat()) / 2;
	var longitude = (n * latlngB.lng() + (1 - n) * latlngA.lng()) / 2;
	
	var point = new google.maps.LatLng(latitude, longitude);
	console.log(point.lng());
	return point;
}


function makeMarker(map, lat, lng, title) {
    var infowindow, marker;
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      title: title
    });
    marker.setMap(map);
    infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(marker.title);
      return infowindow.open(map, marker);
    });
    return marker;
  };