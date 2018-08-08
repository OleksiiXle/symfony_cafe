//-- обработка клика на кнопку открытия окна полной информации
function choiceOperation(item) {
   // console.log(item.dataset.action);
    if (item.dataset.action == 'to_open'){
        //*** - открыть окно редактирования
        //-- звкрыть все открытые окна
        $(".infoWindow").empty().hide();
        //-- поменять все открытые шевроны на закрытые
        var chevrones =  $(".choice_btn");
        $(chevrones).each(function () {
            item.dataset.action = 'to_open';
            this.innerHTML = '<span class="glyphicon glyphicon-chevron-down"></span>';
        });
        // console.log(chevrones);
        //-- поменять свой шеврон на открытый
        item.dataset.action = 'to_close';
        item.innerHTML = '<span class="glyphicon glyphicon-chevron-up"></span>';
       // $("#infoWindow_" + item.dataset.cafe_id).show();
        getInfo(item.dataset.cafe_id);


    } else{
        //**** - закрыть окно редактирования
        //-- звкрыть все открытые окна
        $(".infoWindow").empty().hide();
        //-- поменять свой шеврон на открытый
        item.dataset.action = 'to_open';
        item.innerHTML = '<span class="glyphicon glyphicon-chevron-down"></span>';
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

function getInfo(cafe_id) {
    $.ajax({
        url: 'http://cafe/cafe/cmanager/' + cafe_id + '/info1',
        type: "POST",
       // dataType: 'json',
        success: function(response){
            //  console.log(response);
              $("#infoWindow_" + cafe_id).show().html(response);

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

        },
        error: function (jqXHR, error, errorThrown) {
            console.log( "error : " + error + " " +  errorThrown);
            console.log(jqXHR);
        }
    });


}