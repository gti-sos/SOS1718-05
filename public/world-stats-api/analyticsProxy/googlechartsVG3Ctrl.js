/*global google angular Highcharts*/
angular.module("MusicApp").controller("googlechartsVG3Ctrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/world-stats").then(function(world) {
    $http.get("https://sos1718-07.herokuapp.com/api/v1/global-terrorism-data").then(function(build) {
            
            var datax = [];
  //
  world.data.forEach(v => {
            var vic= [];
            Object.keys(v).forEach(o => {
                
                if (o == "country") {
                    vic.push(v[o]);
                   
                }else if(o == "sale"){
                vic.push(v[o]);
                 }else if(o == "year"){
                vic.push(v[o]);
                 }
                })
        datax.push(vic);
            
        });
        
      
  console.log(datax);
 google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2013',  1000,      400],
          ['2014',  1170,      460],
          ['2015',  660,       1120],
          ['2016',  1030,      540]
        ]);

        var options = {
          title: 'Company Performance',
          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }


     ///////
            
        });
     });
}]);