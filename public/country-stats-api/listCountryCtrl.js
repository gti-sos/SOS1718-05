/*global angular*/
/*global Highcharts*/
/*global google*/
angular.module("MusicApp").controller("ListCountryCtrl", ["$scope", "$http", function($scope, $http) {
    var countryStats = "/api/v1/country-stats";
    var limit = 10;
    var offset = 0;

    var data = [];


    $http.get("/api/v1/country-stats/analytics")
        .then(function(response) {

            Highcharts.chart('analytics', {

                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },

                legend: {
                    enabled: false
                },

                title: {
                    text: 'Average ranking and popularity of albums'
                },


                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: 'Year of release'
                    },
                    labels: {
                        format: '{value}'
                    },
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 1970,
                        label: {
                            rotation: 0,
                            y: 15,
                            style: {
                                fontStyle: 'italic'
                            },
                            text: ''
                        },
                        zIndex: 3
                    }]
                },

                yAxis: {
                    reversed: true,
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: 'Average rank worldwide'
                    },
                    labels: {
                        format: '{value}'
                    },
                    maxPadding: 0.2,
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 0,
                        label: {
                            align: 'right',
                            style: {
                                fontStyle: 'italic'
                            },
                            text: '',
                            x: -10
                        },
                        zIndex: 3
                    }]
                },

                tooltip: {
                    useHTML: true,
                    headerFormat: '<table>',
                    pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                        '<tr><th>Year of release:</th><td>{point.x}</td></tr>' +
                        '<tr><th>Average ranking:</th><td>{point.y}</td></tr>' +
                        '<tr><td>Ranked in {point.z} countries</td></tr>',
                    footerFormat: '</table>',
                    followPointer: true
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },

                series: [{
                    name: 'data',
                    data: response.data
                }]

            });



        })


    ////////////////////    

    $http.get("/api/v1/country-stats/analytics2")
        .then(function(response) {
            google.charts.load('current', {
                'packages': ['geochart'],
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
            console.log(response.data[0].toSource())
            console.log(response.data[1].toSource())
            console.log(response.data[2].toSource())
            function drawRegionsMap() { 
                var data = google.visualization.arrayToDataTable([
                    ['Country', 'Popularity'], 
                    [response.data[0].country, response.data[0].popularity],
                    [response.data[1].country, response.data[1].popularity],
                    [response.data[2].country, response.data[2].popularity],
                    [response.data[3].country, response.data[3].popularity],
                    [response.data[4].country, response.data[4].popularity],
                    [response.data[5].country, response.data[5].popularity]
                ]);

                var options = {};

                var chart = new google.visualization.GeoChart(document.getElementById('mapCountries'));

                chart.draw(data, options);
            }


        })
 
    



    ////////////////////////


    $scope.seguro = function(apikey) {
        $scope.status = "";
        if (apikey == "SOS1718-05") {
            $http.get("/api/v1/secure/country-stats?apikey=" + apikey).then(function(response) {
                $scope.countryStats = response.data;
                console.log(response.data);
            })
        }
        else {
            $scope.status = "Status 401. Wrong password."
        }


    }


    $scope.Busqueda = function(from, to) {
        $http.get(countryStats + "?from=" + JSON.parse(from) + "&to=" + JSON.parse(to)).then(function(response) {
            $scope.countryStats = response.data;
        })
    }


    $scope.deleteAll = function() {

        $http.delete(countryStats).then(function(response) {

            $scope.status = "Status 200. All items were deleted";
            $scope.get();

        });
        $scope.get();

    }

    $scope.deleteRankInCountry = function(country, rank) {

        $http.delete(countryStats + "/" + country + "/" + rank).then(function(response) {
            $scope.status = "Status 200. Item  (" + country + ", " + rank + ") was successfully deleted.";
            $scope.get();
        });

    }

    $scope.deleteCountry = function(country) {

        $http.delete(countryStats + "/" + country).then(function(response) {
            $scope.status = "Status 200. All " + country + " items were successfully deleted.";
            $scope.get();
        });

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////POST
    $scope.addCountry = function() {
        var newAlbum = {};
        Object.keys($scope.newCountry).forEach(p => {

            try {
                newAlbum[p] = JSON.parse($scope.newCountry[p]);
            }
            catch (e) {
                newAlbum[p] = $scope.newCountry[p];
            }
        });
        ($scope.countryStats).forEach(p => {
            if ((p.country == newAlbum.country) && (p.rank == newAlbum.rank)) {
                $scope.status = "Status 409. Another item already exists with the same keys (" + newAlbum.country + ", " + newAlbum.rank + ")."
            }
        });
        if (Object.keys(newAlbum).length == 5) {
            $http.post(countryStats, newAlbum).then(function(response) {

                $scope.status = "Status 201. New item created  (" + newAlbum.country + ", " + newAlbum.rank + ").";
                $scope.get();
            })
        }
        else {
            $scope.status = "Status 400. New items cant have blank parameters."
        }
        $scope.newAlbum = {};
    }

    //////////////////////////////////////////LOAD INITIAL DATA

    $scope.loadInitialData = function() {
        $http.delete(countryStats)
        $http.get("/api/v1/country-stats/loadInitialdata").then(function(response) {
            $scope.status = "Status 201. Successfully loaded 20 preset Items.";
            $scope.get();

        });

    }


    //////////////////////////////////////////////////////////////////////////////////////////////GET
    $scope.get = function() {

        $http.get(countryStats + "?limit=" + limit + "&offset=" + offset).then(function(response) {
            $scope.countryStats = response.data;
        });
    }


    $scope.getCompleto = function() {
        console.log("mostrar api completa")
        $http.get(countryStats).then(function(response) {
            $scope.countryStats = response.data;
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////PAGINACION       
    $scope.getSiguiente = function() {
        offset = offset + 10;
        $http.get(countryStats + "?limit=" + limit + "&offset=" + offset).then(function(response) {
            $scope.countryStats = response.data;
        });
    }

    $scope.getAnterior = function() {

        if (offset >= 10) {
            offset = offset - 10;
        }
        $http.get(countryStats + "?limit=" + limit + "&offset=" + offset).then(function(response) {
            $scope.countryStats = response.data;
        });
    }
    $scope.get();



    ///////////////////////////////////////////////////////////////////////////////////////////////////////       
}]);
