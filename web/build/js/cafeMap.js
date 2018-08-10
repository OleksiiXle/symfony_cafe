// 50.04821, 36.18862100000001
//49.953905, 36.33076249999999



var map;
var infowindow;
var coordinates = {lat: 50.015, lng: 36.220};
var mainMarker;
var cafesArray = [];
//50.01529479696636,36.22036609932616
var markers = [];
var mainPlaceId='';
var mainPlaceAddress='Стартовая точка';
var pinColor = "FE7569";
var pinImage ;
var pinShadow ;

//*********************************************************************************************** ИНИЦИАЛИЗАЦИЯ КАРТЫ
function initMap() {
    //--  создание объекта карты с центром в Харькове
    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 15
    });
    //-- опции для рисования основного маркера
    /*
    pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
        */
    //-- маркер местоположения - дефолтно - середина
    drawMainMarker();
    //-- получить и нарисовать кафе вокруг основного маркера
    refreshMap();
    //-- активировать информационное окошко
    infowindow = new google.maps.InfoWindow();
    //-- обработка события по клику на карту - все маркеры удаляются, основной пеперисовываетсф в месте клика
    //-- и вокруг него рисуются кафешки
    google.maps.event.addListener(map, 'click', function(event) {
        if (mainMarker != undefined) {
            mainMarker.setMap(null);
            mainPlaceAddress='Стартовая точка';
            var latlng = event.latLng;
            var lat = latlng.lat();
            var lng = latlng.lng();
            coordinates = {lat: lat, lng: lng};
            //    console.log(coordinates);
            /*
                  var geo = new google.maps.Geocoder;
                  var geo2 = geo.geocode({
                      location: {lat: lat, lng: lng}
                  }, function(results, status) {
                      console.log(results);
                  });
                  */
            cafesArray.length = 0;
            resetMarkers();
            drawMainMarker();
            refreshMap();
        }
    });
    //-- определение границ автокомплита - почему то не работает
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(50.04821, 36.18862100000001),
        new google.maps.LatLng(49.953905, 36.33076249999999));
    //-- инициализация автокомплита адреса
    var input = document.getElementById('searchTextField');
    var options = {
        bounds: defaultBounds,
        types: ['address']
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);
    document.getElementById('searchTextField').placeholder = 'Введите адрес';
    console.log(cafesArray);
}

//*********************************************************************************************** НАРИСОВАТЬ ОСНОВНОЙ МАРКЕР
function drawMainMarker() {
    var infoWindowContent = '<div><strong>' + mainPlaceAddress + '</strong><br>';
    mainMarker = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        position: coordinates,
        map: map,
        title: 'Iam',
        draggable:true,
        clickable: true,
        animation: google.maps.Animation.DROP,
        visible: true ,
     //   icon: pinImage,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            strokeColor: "green",
            scale: 8
        }
    });
   // console.log(mainPlaceId);

    if (mainPlaceId !== ''){
        var service = new google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: mainPlaceId
        }, function(place, status) {
      //      console.log(place);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                infoWindowContent = '<div><strong>' + place.name + '</strong><br>'
                    + 'Place ID: ' + place.place_id + '<br>'
                    +  place.formatted_address + '</div>';
            }
        });
    }
    google.maps.event.addListener(mainMarker, 'click', function() {
        infowindow.setContent(infoWindowContent);
        infowindow.open(map, this);
    });




}

//*********************************************************************************************** УДАЛИТЬ ВСЕ МАРКЕРЫ
function resetMarkers() {
    //   infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

//****************************************************************** ОБНОВЛЕНИЕ КАРТЫ  ******** ПОКАЗАТЬ БЛИЖАЙШИЕ КАФЕ
function refreshMap() {
    var service = new google.maps.places.PlacesService(map);
    //   console.log(service);

    service.nearbySearch({
        location: coordinates,
        radius: 500,
        type: ['cafe']
    }, callbackRefreshMap);

}

//****************************************************************** ОБНОВЛЕНИЕ КАРТЫ  ******** ОБРАБОТКА РЕЗУЛЬТАТА refreshMap
function callbackRefreshMap(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //  console.log(results[i]);
            createMarker(results[i]);
            cafesArray.push({'id':results[i].id, 'name':results[i].name, 'address':results[i].vicinity,
                'lat':results[i].geometry.location.lat(), 'lng':results[i].geometry.location.lng(), 'addToDb':0 });

/*            cafesArray[results[i].id] = {'name':results[i].name,
                'lat':results[i].geometry.location.lat(), 'lng':results[i].geometry.location.lng() };
                */
        }
    }
}

//****************************************************************** ОБНОВЛЕНИЕ КАРТЫ  ******** НАРИСОВАТЬ ОБЫЧНЫЙ МАРКЕР
function createMarker(place) {
    // console.log(place.geometry.location.lat());
    var content;
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function() {
        content = '<b>' + place.name + '</b><br>' + place.id + '<br>'
            + lat + ', ' +  lng;
        infowindow.setContent(content);
        // infowindow.setContent(place.name);
        infowindow.open(map, this);

    });
}

//*********************************************************************************************** ПОИСК ПО АДРЕСУ
//-- если поиск успешный - все маркеры удаляются, адрес становится центром карты и вокруг него рисуются кафешки
function searchByAdress() {
    //-- проспект Науки, 14, Харків, Харківська область, Украина, 61000
    mainPlaceAddress = document.getElementById('searchTextField').value;
    mainPlaceId='';
    alert(mainPlaceAddress);
    var place = autocomplete.getPlace();
    if (  place !==undefined && place.geometry ) {
      //  console.log(place.id);
        mainPlaceId = place.id;
        map.panTo(place.geometry.location);
        map.setZoom(15);
        coordinates = place.geometry.location;
        cafesArray.length = 0;
        mainMarker.setMap(null);
        resetMarkers();
        refreshMap();
        drawMainMarker();
    } else {
        document.getElementById('searchTextField').value = null;
        document.getElementById('searchTextField').placeholder = 'Введите адрес';
    }
}





