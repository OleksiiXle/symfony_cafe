// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.

var map;
var markers = [];
var infoWindow;
var locationSelect;

function initialize() {
    var mapOptions = {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
    };
    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var marker = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        position: {lat: -34.397, lng: 150.644},
        map: map
    });

    // You can use a LatLng literal in place of a google.maps.LatLng object when
    // creating the Marker object. Once the Marker object is instantiated, its
    // position will be available as a google.maps.LatLng object. In this case,
    // we retrieve the marker's position using the
    // google.maps.LatLng.getPosition() method.
    var infowindow = new google.maps.InfoWindow({
        content: '<p>Marker Location:' + marker.getPosition() + '</p>'
    });

    // google.maps.event.addListener(marker, 'click', function() {
    //      infowindow.open(map, marker);
    //  });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
       // var mPosition =marker.getPosition();
      //  console.log(mPosition);
        /*
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Place ID: ' + place.place_id + '<br>' +
            place.formatted_address + '</div>');
        infowindow.open(map, this);
        */
    });
    google.maps.event.addListener(map, 'click', function(event) {

        if (marker != undefined) {
            marker.setMap(null);
        }

        var latlng = event.latLng;
        var lat = latlng.lat();
        var lng = latlng.lng();
        var coordinates = lat+","+lng;
        alert(coordinates);
     //   var inform = searchLocationsNear(coordinates);
     //   console.log(inform);
        /*
        $("body").on("click", "#button_save_coordinates", function(){
            $.ajax({
                type: "POST",
                url: "save_coordinates.php",
                cache: false,
                data: {"coordinates" : coordinates},
                success: function(data){
                    alert(data);
                }
            });
        });
*/
        marker = new google.maps.Marker({
            position: latlng,
            clickable: true,
            map: map,
            title: 'title',
            animation: google.maps.Animation.DROP,
            visible: true
        });
    });
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

function searchLocationsNear(center) {
   // clearLocations();
    var result;
    var radius = 100;

    var searchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCFePQo22izGTzUMMFLUGH5NBvRSboTGY0';
        /*
    var searchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
        '        location=' + center +
        '        &radius=' + radius +
        '        &type=cafe' +
        '        &key=AIzaSyCFePQo22izGTzUMMFLUGH5NBvRSboTGY0';
    */
  //  var searchUrl = 'storelocator.php?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius;

    downloadUrl(searchUrl, function(data) {
        result = data;
        /*
        var xml = parseXml(data);
        var markerNodes = xml.documentElement.getElementsByTagName("marker");
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markerNodes.length; i++) {
            var id = markerNodes[i].getAttribute("id");
            var name = markerNodes[i].getAttribute("name");
            var address = markerNodes[i].getAttribute("address");
            var distance = parseFloat(markerNodes[i].getAttribute("distance"));
            var latlng = new google.maps.LatLng(
                parseFloat(markerNodes[i].getAttribute("lat")),
                parseFloat(markerNodes[i].getAttribute("lng")));

            createOption(name, distance, i);
            createMarker(latlng, name, address);
            bounds.extend(latlng);
        }
        map.fitBounds(bounds);
        locationSelect.style.visibility = "visible";
        locationSelect.onchange = function() {
            var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
            google.maps.event.trigger(markers[markerNum], 'click');
        };
        */
    });
    return result;
}

function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request.responseText, request.status);
        }
    };

    request.open('GET', url, true);
    request.send(null);
}

function doNothing() {}




google.maps.event.addDomListener(window, 'load', initialize);


/*
https://maps.googleapis.com/maps/api/place/nearbysearch/json?
        location=-33.8670522,151.1957362
        &radius=1500
        &type=restaurant
        &keyword=cruise
        &key=YOUR_API_KEY
 */