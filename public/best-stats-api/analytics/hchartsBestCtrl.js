/*global angular Highcharts*/
angular.module("MusicApp").controller("hchartsBestCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(response) {
        var data = [];
        
        response.data.forEach(p => {
            var obj = {};
            Object.keys(p).forEach(o => {
                console.log(p["year"]);
                
                if (o == "year") {
                    obj["value"] = p[o];
                    obj["colorValue"] = p[o];
            }else if(o == "song"){
                obj["name"] = p[o]
            }

            
            })
        data.push(obj);
            
        });

        console.log(data);
        Highcharts.chart('hchartsBest', {
            colorAxis: {
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[4]
            },
            series: [{
                type: 'treemap',
                layoutAlgorithm: 'squarified',
                data: data
            }],
            title: {
                text: 'Best Songs Analytics'
            }
        });
    })
}]);
