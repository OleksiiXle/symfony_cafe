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
var cafeToDbArray = [];


//*********************************************************************************************** ИНИЦИАЛИЗАЦИЯ КАРТЫ
function initMap() {
    $.when(
        initMapPrewious()
    )
        .done(function() {
            console.log(cafesArray)
            loadCafeFrom('map');
        });

}

function initMapPrewious() {
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

//******************************************************************** FRONT-BACK-END
//--загрузка в cafeGrid грида кафе из бд или тех, что на карте bd/map
function loadCafeFrom(sourse) {
    var data;
    switch (sourse){
        case 'db':
            $.ajax({
                url: 'http://cafe/map/' + sourse,
                type: "POST",
                success: function(response){
                    //   console.log(response);
                    $("#cafeGrid").html(response);
                },
                error: function (jqXHR, error, errorThrown) {
                    console.log( "error : " + error + " " +  errorThrown);
                    console.log(jqXHR);
                }
            });
            break;
        case 'map':
            //  console.log('array cafesArray');
            //  console.log(cafesArray);
            data = encodeURIComponent(JSON.stringify(cafesArray));
            //   data = cafesArray.serialize();
            //  console.log('data for send');
            //   console.log(data);
            //    return;
            $.ajax({
                url: "http://cafe/map/" + data + "/" + sourse,
                type: "GET",
                //  dataType: 'json',
                success: function(response){
                    //  console.log(response);
                    $("#cafeGrid").html(response);
                },
                error: function (jqXHR, error, errorThrown) {
                    console.log( "error : " + error + " " +  errorThrown);
                    console.log(jqXHR);
                }
            });
            break;
    }

}

//-- обработка клика на кнопку открытия окна редактирования
function updateWindowOpen(item) {
    // console.log(item.dataset.action);
    if (item.dataset.action == 'to_open'){
        //*** - открыть окно редактирования
        //-- звкрыть все открытые окна
        $(".updateWindow").html('').hide();
        //-- поменять все открытые шевроны на закрытые
        // var chevrones =  $(".choice_btn");
        //  $(chevrones).each(function () {
        //      item.dataset.action = 'to_open';
        //   });
        // console.log(chevrones);
        //-- поменять свой шеврон на открытый
        item.dataset.action = 'to_close';
        // $("#infoWindow_" + item.dataset.cafe_id).show();
        getInfo(item.dataset.cafe_id);
    } else{
        //**** - закрыть окно редактирования
        //-- звкрыть все открытые окна
        $(".updateWindow").html('').hide();
        //-- поменять свой шеврон на открытый
        item.dataset.action = 'to_open';
    }
    /*
        if (item.dataset.action == 'to_close'){
        //-- закрыть окно редактирования
        item.dataset.action = 'to_open';
        item.innerHTML = '<span class="glyphicon glyphicon-chevron-down"></span>';
    } else{
    }
     */
}

//-- обработка клика на кнопку открытия окна редактирования
function viewWindowOpen(item) {
    // console.log(item.dataset.action);
    // console.log(item.dataset.action);
    // var buttons =  $(".view_btn");
    //  $(buttons).each(function () {
    //      item.dataset.action = 'to_open';
    //  });
//-- звкрыть все открытые окна
    $(".infoWindow").html('').hide();
    if (item.dataset.action == 'to_open'){
        item.dataset.action = 'to_close';

        getInfoView(item);
    } else{
        item.dataset.action = 'to_open';
    }
}

//-- вывод формы редактирования в открывшееся окно
function getInfo(cafe_id) {
    $.ajax({
        url: 'http://cafe/map/' + cafe_id + '/info1',
        type: "POST",
        // dataType: 'json',
        success: function(response){
            //  console.log(response);

            $("#updateWindow_" + cafe_id).show().html(response);
            /*
            if (response['status']){
                var formExample = $("#formExample");
                var newForm = formExample.clone(false).show();
                $("#infoWindow_" + cafe_id).append(newForm).show();
                $("#title").html(response['data']['title']);
                $("#id").html(response['data']['id']);
                $("#google_place_id").html(response['data']['google_place_id']);
                $("#address").html(response['data']['address']);
                $("#latLng").html(response['data']['lat'] + ', ' + response['data']['lang']);
                document.getElementById('xle_cafebundle_cafe_id').value = (response['data']['id']);
                document.getElementById('xle_cafebundle_cafe_raiting').value = (response['data']['raiting']);
                document.getElementById('xle_cafebundle_cafe_review').value = (response['data']['review']);
                document.getElementById('xle_cafebundle_cafe_status').value = (response['data']['status']);
            } else {
                $("#infoWindow_" + cafe_id).html('Информация не найдена');
            }
            */
        },
        error: function (jqXHR, error, errorThrown) {
            errorHandler(jqXHR, error, errorThrown);
        }
    });
}

//-- вывод данных в открывшееся окно просмотра
function getInfoView(item) {
    // alert(item.dataset.cafe_id);
    // $(".infoWindow").empty().hide();
    $("#infoWindow_" + item.dataset.cafe_id).show();
    $.ajax({
        url: 'http://cafe/map/' + item.dataset.cafe_id + '/info',
        type: "POST",
        dataType: 'json',
        success: function(response){
            // console.log(response);
            if (response['status']){
                var viewExample = $("#viewExample");
                var newView = viewExample.clone(false).show();
                $("#infoWindow_" + item.dataset.cafe_id).append(newView).show();
                $("#id").html(response['data']['id']);
                $("#google_place_id").html(response['data']['google_place_id']);
                $("#title").html(response['data']['title']);
                $("#address").html(response['data']['address']);
                $("#raiting").html(response['data']['raiting']);
                $("#review").html(response['data']['review']);
                $("#status").html(response['data']['status']);
                $("#latLng").html(response['data']['lat'] + ', ' + response['data']['lang']);
            } else {
                $("#infoWindow_" + item.dataset.cafe_id).html('Информация не найдена');
            }
        },
        error: function (jqXHR, error, errorThrown) {
            console.log( "error : " + error + " " +  errorThrown);
            console.log(jqXHR);
        }
    });
}

function updateCafe() {
    // var fd = $("#xle_cafebundle_cafe").serialize();
    //var formData = $("#xle_cafebundle_cafe").serializeArray();
    var formData = $('[name="xle_cafebundle_cafe"]').serializeArray();
    // console.log($('[name="xle_cafebundle_cafe"]'));
    //  console.log(fd);
    // console.log(formData);
    //  return;
    //  alert(document.getElementById('xle_cafebundle_cafe_id').value);
    $.ajax({
        url: 'http://cafe/map/modify',
        data: formData,
        type: "POST",
        dataType: 'json',
        success: function(response){
            console.log(response);
            //-- звкрыть все открытые окна
            if (response['status']){
                $("#td_raiting_" + response['data']['id']).html(response['data']['raiting']);
                $("#td_status_" + response['data']['id']).html(response['data']['status']);
                $(".updateWindow").empty().hide();
            } else {
                objDump(response['data']);
            }


        },
        error: function (jqXHR, error, errorThrown) {
            errorHandler(jqXHR, error, errorThrown);
        }
    });


}

//-- удаление кафе
function deleteCafe(item) {
    if (confirm('Подтвердите удаление')){
        alert('delete - ' + item.dataset.cafe_id);
        $.ajax({
            url: 'http://cafe/map/' + item.dataset.cafe_id + '/delete',
            type: "DELETE",
            dataType: 'json',
            success: function(response){
                console.log(response);
                if (response['status']){
                    $("#tr_" + item.dataset.cafe_id).remove();
                    alert('Кафе удалено')
                } else {
                    alert(('Ошибка : ' + response['data'] ))
                }
            },
            error: function (jqXHR, error, errorThrown) {
                errorHandler(jqXHR, error, errorThrown);
            }
        });

    }
}

//-- добавить отмеченные кафе в БД
function addCafiesToDB() {
    var name, address;
    cafeToDbArray = [];
    $('input:checkbox:checked').each(function(){
        //console.log(this.dataset);
        if (this.dataset.db.length == 0){
            name = $("#td_name_" + this.dataset.cafe_id)[0].innerText;
            address = $("#td_address_" + this.dataset.cafe_id)[0].innerText;
            cafeToDbArray.push({id : this.dataset.cafe_id,
                name : name, address:address,
                lat : this.dataset.lat, lng : this.dataset.lng});
        }
    });
    console.log(cafeToDbArray);
    if (cafeToDbArray.length > 0){
        $.ajax({
            url: 'http://cafe/map/append',
            data: JSON.stringify(cafeToDbArray),
            type: "POST",
            dataType: 'json',
            success: function(response){
                console.log(response);
                objDump(response['data'])
                //-- звкрыть все открытые окна
            },
            error: function (jqXHR, error, errorThrown) {
                console.log( "error : " + error + " " +  errorThrown);
                console.log(jqXHR);
            }
        });
    }

}

function errorHandler(jqXHR, error, errorThrown){
    console.log('Ошибка:');
    console.log(errorThrown);
    console.log(jqXHR['status']);
    if (jqXHR['status']==403){
        alert('Действие не возможно, необходимо войти в систему, как администратор.');
    }
}

function objDump(object) {
    var out = "";
    if(object && typeof(object) == "object"){
        for (var i in object) {
            out += i + ": " + object[i] + "\n";
        }
    } else {
        out = object;
    }
    alert(out);
}





