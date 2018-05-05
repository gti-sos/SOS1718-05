
/*global angular google */
angular.module("MusicApp").controller("googleBestCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(response) {
        
         google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {
        var data = [];
        data.push(["country","year","year","album"]);
        response.data.forEach(p => {
            var obj = [];
            
            Object.keys(p).forEach(o => {
                
                if(o=="year"){
                    obj.push(p[o]);
                    obj.push(p[o]);
                }else if(o=="country"){
                obj.push(p[o]);
                }else if(o=="album"){
                    obj.push(p[o]);
                }

            })
           console.log(obj);
           data.push(obj);

        });
    console.log(data);
      var grafica = google.visualization.arrayToDataTable(data
      );

      var options = {
        title: 'Most selling album in Spain per year',
        hAxis: {title: 'Year'},
        vAxis: {title: 'Year'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('googleBest'));
      chart.draw(grafica, options);
    }
        
        
        
        
        
        
    });

}]);