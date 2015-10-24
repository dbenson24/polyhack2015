var express = require('express');
var request = require('request');
var router = express.Router();


/* GET home page. */
router.get('/locations/:lat/:lon', function(req, res, next) {
    var API = '4F5A3954F085445486E190A252ED8DB9';
    var website = 'https://api.tripadvisor.com/api/partner/2.0/';
    var lat = req.params.lat;
    var lon = req.params.lon;

    //find places near location
    var placesAPI = website + 'map/' + lat + ',' + lon + '?key=' + API;
    //Check for error
    request(placesAPI, function(error, response, body) {
        if (error) {
            res.send('Error:', error);
        }
        else if (response.statusCode !== 200) {
            res.send('Invalid Status Code Returned:', response.statusCode);
        }
        else {
            var text = JSON.parse(body);            
            var locations = [];
            for (var i = 0; i < text.data.length; i++) {
                var rand = Math.round(Math.random() * 20);
                locations.push({});
                locations[i].lat = text.data[i].latitude;
                locations[i].lng = text.data[i].longitude;
                locations[i].locId = text.data[i].location_id;
                locations[i].name = text.data[i].name;
                locations[i].rating = text.data[i].rating;
                /*
                if (rand >= text.data[i].reviews.length) {
                    rand = text.data[i].reviews.length - 1;
                }
                locations[i].title = text.data[i].reviews[rand].title;
                locations[i].text = text.data[i].reviews[rand].text;
                locations[i].rating = text.data[i].reviews[rand].rating;
                */
            }
            res.send(locations);
        }

    });
});

module.exports = router;
