var API = '4F5A3954F085445486E190A252ED8DB9';
var website = 'https://api.tripadvisor.com/api/partner/2.0/';
var reviewData;
/*
var indico = require('indico.io');
indico.apiKey = 'b15030af4c7ec1c87243db098e9108e0';
*/


function findPlaces(lat, lon) {
    //find places near location
    var locations = [];
    var review = [];
    
    var placesAPI = website + 'map/' + lat + ',' + lon + '?key=' + API;
    $.getJSON(placesAPI, function(text) {
        var rand = Math.round(Math.random()*text.data.length);
        for (var i = 0; i < text.data.length; i++) {
            locations[i] = text.data[i];
            locations[i].lat = text.data[i].latitude;
            locations[i].lng = text.data[i].longitude;
            locations[i].locId = text.data[i].location_id;
            locations[i].type = text.data[i].category;
            var reviewsAPI = website + 'location/' + location + '/reviews?key=' + API;
            $.getJSON(reviewsAPI, function(revText) {
                locations[i].title = revText.data[rand].title;
                locations[i].text = revText.data[1].text;
                locations[i].rating = revText.data[rand].rating;
            });
            /*
            indico.sentimentHQ("Make this the text from rating.")
              .then(function(res) { // res = the result of the sentiment function as a decimal
                console.log(res);
              }).catch(function(err) {
                console.warn(err);
              });
              */
            
            //getReviews(locations[i].locId);
            //console.log(reviewData);
            /*locations[i].title = review[i][0];
            locations[i].text = review[i][1];
            locations[i].rating = review[i][2];*/
        }
    });
    return locations;
}

//function getReviews(location) {
    //get reviews for given place
    
//}

findPlaces(46.9229609,-68.9987383)