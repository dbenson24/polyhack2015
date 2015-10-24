// Generated by CoffeeScript 1.7.1

/*
yourLocation = new google.maps.LatLng(42.4019, -71.1193)
myOptions =
    zoom: 13,
    center: yourLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
map = new google.maps.Map(document.getElementById("map"), myOptions)
 */

(function() {
  var writeText;

  $.getJSON("/api/locations/" + 41.852564 + "/" + -87.651340, function(data) {
    return plotRoute(data);
  });

  writeText = function(text) {
    var i, write, x, _results;
    i = 0;
    write = function() {
      var header;
      header = $(".header h1");
      header.html(header.html() + text[i]);
      return i++;
    };
    x = 0;
    _results = [];
    while (x < text.length) {
      setTimeout(write, x * 250);
      _results.push(x++);
    }
    return _results;
  };

  writeText("Skeleton Activity");

}).call(this);
