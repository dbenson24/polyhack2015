myLat = 42.4039256 #Tufts
myLng = -71.1168384 #Tufts

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

###
Oh, if you could get the reviews working, that would be awesome

Also, thanks. We've been getting pretty frusturated.

What about the reviews tho
I don't really get where they are displayed
or what they do


Can you guys write out a nice Readme?


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
