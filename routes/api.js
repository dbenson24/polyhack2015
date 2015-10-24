var express = require('express');
var request = require('request');
var sentenceGen = require("./sentenceGen");

var mongo = require('mongodb');
var monk = require('monk');
var db = monk("mongodb://polyhack:polyhack@ds043694.mongolab.com:43694/skeleton");

var router = express.Router();


/* GET locations */
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
            // elem.innerHTML += "<p>While you were asleep, your skeleton decided to take an adventure around $location.</p>"
            for (var i = 0; i < text.data.length; i++) {
                var rand = Math.round(Math.random() * 20);
                locations.push({});
                locations[i].lat = text.data[i].latitude;
                locations[i].lng = text.data[i].longitude;
                locations[i].locId = text.data[i].location_id;
                locations[i].name = text.data[i].name;
                locations[i].rating = text.data[i].rating;
                locations[i].type = text.data[i].category.name;
                locations[i].sentence = sentenceGen(locations[i], i);
            }
            //res.send(locations);
            var collection = db.get('stories');
            collection.insert({
                "locations": locations
            }, function(err, result) {
                res.send(
                    (err === null) ? {
                        result
                    } : {
                        msg: err
                    }
                );
            });
        }

    });
});

router.get('/locations', function(req, res, next) {
    var API = '4F5A3954F085445486E190A252ED8DB9';
    var website = 'https://api.tripadvisor.com/api/partner/2.0/';
    var lat = 42.403604;
    var lon = -71.113997;

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
            res.send(text);
        }

    });
});

router.get('/saved/:id', function(req, res, next) {
    var collection = db.get('stories');
    collection.find({"_id":req.params.id
    }, function(err, docs) {
        res.send(
            (err === null) ? {
                docs
            } : {
                msg: err
            }
        );
    });
});


module.exports = router;
