/*global angular $http google*/
angular.module("MusicApp").controller("googleChartsSCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(best) {
        $http.get("https://swapi.co/api/vehicles/").then(function(star) {
        var st = [];
        st = star.data["results"];
        console.log(st)
    
        var arr = [['Song/vehicles', 'Year', 'Price']]
            var cont = 1976;
            st.forEach(f=>{
            var arr2 = [];
            
            Object.keys(f).forEach(p=>{
                if(p == "name"){
                    arr2.push(f[p]);
                }
                if(p == "cost_in_credits"){
                    arr2.push(0);
                    arr2.push(parseInt(f[p],0));
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
                    obj.push(0);
                }else if(o=="song"){
                    obj.unshift(p[o]);
                }

            })
           
           arr.push(obj);

        });
    console.log(arr);
    
    
    
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawMultSeries);

    function drawMultSeries() {
      var data = google.visualization.arrayToDataTable(arr);

      var options = {
        title: 'Star wars vehicles and song',
        chartArea: {height: '80%'},
        hAxis: {
          title: 'Years/Price',
          minValue: 0
        },
        vAxis: {
          title: 'Vehicles/song'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }





        })
    }) 
}])