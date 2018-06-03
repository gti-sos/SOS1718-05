/*global angular tree google*/


angular.module("MusicApp").controller("googleChartsFCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(best) {
        $http.get("https://soccer.sportsopendata.net/v1/leagues").then(function(futbol) {
        var fut = [];
        var aux = futbol.data["data"];
        fut= aux["leagues"];
        
        var arr = [['Location', 'year', 'year/level', 'League/song']]; 
        var cont = 2010;
        fut.forEach(f=>{
            var arr2 = [];
            
            Object.keys(f).forEach(p=>{
                if(p == "league_slug"){
                    arr2.push(cont);
                    arr2.push(parseInt(f["level"]));
                    arr2.push(f[p]);
            }else if(p == "nation"){
                    arr2.unshift(f[p]);
                }
                
                
            })
            
            cont = cont + 1;
            arr.push(arr2);
        })
       best.data.forEach(p => {
            var obj = [];
            
            Object.keys(p).forEach(o => {
                
                if(o=="year"){
                    obj.push(p[o]);
                    obj.push(p[o]);
                }else if(o=="country"){
                obj.push(p[o]);
                }else if(o=="song"){
                    obj.push(p[o]);
                }

            })
           console.log(obj);
           arr.push(obj);

        });
      
        
         google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {

      var data = google.visualization.arrayToDataTable(arr);

      var options = {
        title: 'Correlation between life expectancy, fertility rate ' +
               'and population of some world countries (2010)',
        hAxis: {title: 'Life Expectancy'},
        vAxis: {title: 'Fertility Rate'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
       
    
    
    })
    })
}])
