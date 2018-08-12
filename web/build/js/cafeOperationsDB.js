var cafeToDbArray = [];
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

function switchDbMap(item) {
    console.log($(item)[0].innerText);
    if (item.dataset.action == 'show_map'){
        item.dataset.action = 'show_db';
        $(item)[0].innerText ='Показать список сохраненных кафе';
        loadCafeFrom('map');
    } else {
        item.dataset.action = 'show_map';
        $(item)[0].innerText = 'Показать список кафе на карте';
        loadCafeFrom('db');

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

//************************************************************************************ СТАРТ
loadCafeFrom('db');