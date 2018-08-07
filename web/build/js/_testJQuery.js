function testJquery(){
    $('#info_test').html('jQuery is here');
}

function sendQuery() {
    //var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    var url = 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyCFePQo22izGTzUMMFLUGH5NBvRSboTGY0';
  //  ?query=123+main+street&location=42.3675294,-71.186966&radius=10000&key=YOUR_API_KEY
    //https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyCFePQo22izGTzUMMFLUGH5NBvRSboTGY0
    $.ajax({
        url: url,
      type: "POST",
    //    data: {
    //        'query': 'restaurants+in+Sydney',
     //       'key'   : 'AIzaSyCFePQo22izGTzUMMFLUGH5NBvRSboTGY0'
   //     },
       // dataType: 'json',
        success: function(response){
            console.log(response);
        },
        error: function (jqXHR, error, errorThrown) {
            console.log( "Помилка  : " + error + " " +  errorThrown);
            console.log(jqXHR);

        }
    });

}