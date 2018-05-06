/*global angular google */
angular.module("MusicApp").controller("googleWorldCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/world-stats").then(function(response) {
   
        google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

  var datax = []
   datax.push(["album","sale"]);
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
        

        var data = google.visualization.arrayToDataTable([
          ['Album', 'Sale'],
          [datax[0].album, datax[0].sale],
          [datax[1].album, datax[1].sale],
          [datax[2].album, datax[2].sale],
          [datax[3].album, datax[3].sale],
          [datax[4].album, datax[4].sale],
          [datax[5].album, datax[5].sale],
          [datax[6].album, datax[6].sale],
          [datax[7].album, datax[7].sale],
          [datax[8].album, datax[8].sale],
          [datax[9].album, datax[9].sale],
          [datax[10].album, datax[10].sale],
          [datax[11].album, datax[11].sale],
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('googleWorld'));

        chart.draw(data, options);
      }
    
    });

}]);