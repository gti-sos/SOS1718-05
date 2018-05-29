/*global google angular Highcharts*/
angular.module("MusicApp").controller("googlechartsVG4Ctrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/world-stats").then(function(world) {
    $http.get("/proxyVG1").then(function(build) {
            ////////////////////CAMBIARLO POR UNA API FUERA DE SOS
           //console.log(build.data);
            var datax = [];
            var obj = build.data["standings"];
            var obj2 = obj["A"];
            console.log(obj2);
  //
   world.data.forEach(v => {
            var vic= [];
            Object.keys(v).forEach(o => {
                
                if (o == "sale") {
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
                
                if (o == "rank") {
                   vic.push(v[o]);
                   
                }else if(o == "teamId"){
                vic.push(v[o]);
                 }
                })
        datax.push(vic);
            
        });
        
      
  console.log(datax);
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
      var data = new google.visualization.DataTable(datax);
      data.addColumn('number', 'X');
      data.addColumn('number', 'Dogs');

      data.addRows(datax);

   /*  //
        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        [66, 70], [67, 72], [68, 75], [69, 80]
    */
      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Popularity'
        },
        backgroundColor: '#f1f8e9'
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }


     ///////
            
        });
     });
}]);