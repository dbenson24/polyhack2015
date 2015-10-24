var API = '4F5A3954F085445486E190A252ED8DB9';
var website = 'https://api.tripadvisor.com/api/partner/2.0/';


function findPlaces(lat, lon) {
    //find places near location
    var locations = [];
    var placesAPI = website + 'map/' + lat + ',' + lon + '?key=' + API;
    $.getJSON(placesAPI, function(text) {
        for (var i = 0; i < text.data.length; i++) {
            locations[i] = text.data[i];
            locations[i].lat = text.data[i].latitude;
            locations[i].lng = text.data[i].longitude;
            locations[i].locId = text.data[i].location_id;
            console.log(locations[i].lat);
            var review = getReviews(locations[i].locId);
            locations[i].title = review.title;
            locations[i].text = review.text;
            locations[i].rating = review.rating;
        }
    });
    return locations;
}

function getReviews(location) {
    //get reviews for given place
    var reviewsAPI = website + 'location/' + location + '/reviews?key=' + API;
    $.getJSON(reviewsAPI, function(text) {
        var review = text.data[Math.round(Math.random()*text.num_reviews)];
        var title = review.title;
        var text = review.text;
        var rating = review.rating;
        var reviewData = [title, text, rating];
        console.log(reviewData);
        return reviewData;
    });
}

findPlaces(46.9229609,-68.9987383)