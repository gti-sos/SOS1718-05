/*global angular google */
/*global Morris*/
angular.module("MusicApp").controller("visWorldCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/world-stats").then(function(response) {
   var datax = []
  
     response.data.forEach(v => {
            var vic= {};
            Object.keys(v).forEach(o => {
                console.log(v["sale"]);
               
                if (o == "sale") {
                    vic["sale"] = v[o];
                   
            }else if(o == "album"){
                vic["album"] = v[o]
            }
            })
        datax.push(vic);
          
        });
   var r = datax[0].sale;
     new Morris.Bar({
  // ID of the element in which to draw the chart.
  element: 'visWorld',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  
  data: [
    { album: datax[0].album, sale: datax[0].sale },
    { album: datax[1].album, sale: datax[1].sale },
    { album: datax[2].album, sale: datax[2].sale },
    { album: datax[3].album, sale: datax[3].sale },
    { album: datax[4].album, sale: datax[4].sale },
    { album: datax[5].album, sale: datax[5].sale },
    { album: datax[6].album, sale: datax[6].sale },
    { album: datax[7].album, sale: datax[7].sale },
    
    
    
  ],
  // The name of the data record attribute that contains x-values.
  xkey: 'album',
  // A list of names of data record attributes that contain y-values.
  ykeys: ['sale'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['sale']
});
    
    });

}]);