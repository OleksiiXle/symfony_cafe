function loadCafeFrom(sourse) {
    $.ajax({
        url: 'http://cafe/cafe/cmanager/' + sourse,
        type: "POST",
        success: function(response){
          //    console.log(response);
            $("#cafeGrid").html(response);
        },
        error: function (jqXHR, error, errorThrown) {
            console.log( "error : " + error + " " +  errorThrown);
            console.log(jqXHR);
        }
    });

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
        url: 'http://cafe/cafe/cmanager/' + cafe_id + '/info1',
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
            console.log( "error : " + error + " " +  errorThrown);
            console.log(jqXHR);
        }
    });
}

//-- вывод данных в открывшееся окно просмотра
function getInfoView(item) {
   // alert(item.dataset.cafe_id);
  // $(".infoWindow").empty().hide();
    $("#infoWindow_" + item.dataset.cafe_id).show();
    $.ajax({
        url: 'http://cafe/cafe/cmanager/' + item.dataset.cafe_id + '/info',
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
        url: 'http://cafe/cafe/cmanager/modify',
        data: formData,
        type: "POST",
        dataType: 'json',
        success: function(response){
            console.log(response);
            //-- звкрыть все открытые окна
            $(".updateWindow").empty().hide();
            if (response['status']){
                $("#td_raiting_" + response['data']['id']).html(response['data']['raiting']);
                $("#td_status_" + response['data']['id']).html(response['data']['status']);
            }


        },
        error: function (jqXHR, error, errorThrown) {
            console.log( "error : " + error + " " +  errorThrown);
            console.log(jqXHR);
        }
    });


}

//-- удаление кафе
function deleteCafe(item) {
    if (confirm('Подтвердите удаление')){
        alert('ok - ' + item.dataset.cafe_id);
        $("#tr_" + item.dataset.cafe_id).remove();
        /*
            $("#infoWindow_" + item.dataset.cafe_id).show();
    $.ajax({
        url: 'http://cafe/cafe/cmanager/' + item.dataset.cafe_id + '/info',
        type: "POST",
        dataType: 'json',
        success: function(response){
            // console.log(response);
            if (response['status']){
            } else {
                $("#infoWindow_" + item.dataset.cafe_id).html('Информация не найдена');
            }
        },
        error: function (jqXHR, error, errorThrown) {
            console.log( "error : " + error + " " +  errorThrown);
            console.log(jqXHR);
        }
    });

         */
    }
    // $(".infoWindow").empty().hide();
}

//************************************************************************************ СТАРТ
loadCafeFrom('db');