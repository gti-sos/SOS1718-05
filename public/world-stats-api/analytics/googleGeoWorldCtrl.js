/*global angular google*/
angular.module("MusicApp").controller("googleGeoWorldCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("/api/v1/world-stats")
        .then(function(response) {
            
            var datax = [];
  
        response.data.forEach(v => {
            var vic= {};
            Object.keys(v).forEach(o => {
                console.log(v["sale"]);
               
                if (o == "sale") {
                    vic["sale"] = v[o];
                   
                }else if(o == "country"){
                vic["country"] = v[o]
                 }
                })
        datax.push(vic);
            
        });
     google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
          
           [datax[0].country, datax[0].sale],
          [datax[1].country, datax[1].sale],
          [datax[8].country, datax[8].sale]
          
          
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }

     ///////
            
        });
}]);