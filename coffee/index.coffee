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

#myLat = 48.8582;
#myLng = 2.2945;
#myLat = 40.7
#myLng = 23.324
myLat = 42.4039256 #Tufts
myLng = -71.1168384 #Tufts
##}

window.changeLocation = () ->
    myLat = $("#lat").val()
    myLng = $("#lng").val()
    
    $("#events").html("")
    
    if window.animation?
        clearInterval window.animation
        window.animation = null
    
    $.getJSON("/api/locations/" + myLat + "/" + myLng, (result) ->
        data = result.result.locations
        plotRoute(data)
        fillEvents(data[0...9])
        $("#link").html("https://polyhack2015-dbenson24.c9.io/##{result.result._id}")
    )

##just wanted to mention that we're having a lot of trouble understanding your code
## basically, we've only been able to work with plotRoute and sentenceGen. And style.css, a bit. Everything else either doesn't save, isn't used at all, or we just don't understand
## So twice now we've spent hours working on code that isn't actually used anymore.
## If there's obsolete code files, could you delete those? At some point, anyway.
## Making it actually work is higher-priority
## Okay so what doesn't work
## refresh the page and tell me

###
Assertion failed: InvalidValueError: in property origin: not a string; and not a LatLng or LatLngLiteral: not an Object; and not an Object
in main.js:16
and

Uncaught TypeError: Cannot read property 'N' of null
VM3308:7


I know I see that
but what about the page isn't working
###


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
        writeText(loc.sentence, "#msg_#{id}", 100)

if (window.location.hash is "#" or window.location.hash is "")
    
else 
    r = $.getJSON("/api/saved/" + window.location.hash.substring(1), (result) ->
        if result.err?
            alert "That was an invalid Skeleton Story. Redirecting..."
            setTimeout(() ->
                window.location.hash = ""
                window.location.href = window.location.href
                location.reload(true)
            , 2000)
        else
            data = result.result.locations
            plotRoute(data)
            fillEvents(data[0...9])
    )
    r.fail(() ->
        alert "That was an invalid Skeleton Story. Redirecting..."
        setTimeout(() ->
            window.location.hash = ""
            window.location.href = window.location.href
            location.reload(true)
        , 2000)
    )




writeText("Skeleton Activity", ".header h1", 250)
