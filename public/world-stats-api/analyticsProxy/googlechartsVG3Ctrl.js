/*global google angular Highcharts*/
angular.module("MusicApp").controller("googlechartsVG3Ctrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/world-stats").then(function(world) {
    $http.get("/proxyVG1").then(function(build) {
            ////////////////////CAMBIARLO POR UNA API FUERA DE SOS
            var datax = [['Year', 'Year-Rank', 'Sale-TeamId']];
            
            var obj = build.data["standings"];
            var obj2 = obj["A"];
            console.log(obj2);
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
         obj2.forEach(v => {
            var vic= [];
            Object.keys(v).forEach(o => {
                
                if (o == "team") {
                   vic.unshift(v[o]);
                   
                }else if(o == "teamId"){
                vic.push(v[o]);
                
                 }else if(o == "rank"){
                vic.push(v[o]);
                 }
                })
        datax.push(vic);
            
        });
      
  console.log(datax);
 google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(datax);

        var options = {
          title: 'World Cup 2018 Russia and world-stats',
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