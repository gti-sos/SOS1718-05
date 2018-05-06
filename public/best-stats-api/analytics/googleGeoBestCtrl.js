/*global angular google*/
angular.module("MusicApp").controller("googleGeoBestCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(response) {
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = [];
            var cont = 0;
            data.push(["country", "Elements in database"]);
            response.data.forEach(p => {
                cont = cont +1;
            })
            data.push(["Spain",cont]);
            console.log(data);
            var grafica = google.visualization.arrayToDataTable(data);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(grafica, options);
        }
    });
}]);
