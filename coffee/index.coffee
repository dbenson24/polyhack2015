###
yourLocation = new google.maps.LatLng(42.4019, -71.1193)
myOptions =
    zoom: 13,
    center: yourLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
map = new google.maps.Map(document.getElementById("map"), myOptions)
###
## Let's hold off on the current location - Derek
## I think we should implement it so that the user picks a location for the
## skeleton to start moving from
###
var myLat;
var myLng;
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
						myLat = position.coords.latitude;
						myLng = position.coords.longitude;
    }
} else {

###
myLat = 48.8582;
myLng = 2.2945;

##}


window.writeText = (text, selector, rate) ->
    i = 0
    write = () ->
        header = $(selector)
        header.html(header.html()+text[i])
        i++
    x = 0
    while x < text.length
        setTimeout(write, x*rate)
        x++

fillEvents = (locations) ->
    console.log("locations", locations)
    events = $("#events")
    for loc, id in locations
        content = """<li id="msg_#{id}" class="event">
                     </li>
                  """
        events.html(events.html()+content)
        writeText(loc.sentence, "#msg_#{id}", 150)

$.getJSON("/api/locations/" + myLat + "/" + myLng, (result) ->
    data = result.result.locations
    plotRoute(data)
    fillEvents(data[0...9])
)

        
writeText("Skeleton Activity", ".header h1", 250)
