###
yourLocation = new google.maps.LatLng(42.4019, -71.1193)
myOptions =
    zoom: 13,
    center: yourLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
map = new google.maps.Map(document.getElementById("map"), myOptions)
###



$.getJSON("/api/locations/" + 41.852564 + "/" + -87.651340, (data) ->
    plotRoute(data)
)
writeText = (text) ->
    i = 0
    write = () ->
        header = $(".header h1")
        header.html(header.html()+text[i])
        i++
    x = 0
    while x < text.length
        setTimeout(write, x*250)
        x++
        
writeText("Skeleton Activity")
