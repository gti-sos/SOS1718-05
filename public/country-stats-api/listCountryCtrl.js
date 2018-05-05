/*global angular*/
angular.module("MusicApp").controller("ListCountryCtrl", ["$scope", "$http", function($scope, $http) {
    var countryStats = "/api/v1/country-stats";
    var limit = 10;
    var offset = 0;

    $http.get("/api/v1/country-stats")
        .then(function(response) {

            var graphData = [];
            var finalData = [];
            var countries = [];

            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                if (item in graphData) {
                    console.log("ocupado");
                } 
                else {
                    graphData.push({ "x": item.year, "country": item.country, "name": item.title, "z": 1, "y": item.rank });
                }
            }


            for (var i = 0; i < graphData.length - 1; i++) {

                var title = graphData[i].name;
                var country = graphData[i].country;
                var year = graphData[i].x;
                var popularity = graphData[i].z; 
                var Avgrank = graphData[i].y; 
                var sumRank = graphData[i].y;
 
                for (var j = i + 1; j < graphData.length; j++) {
                    if (graphData[j].name == title) {
                        popularity++;
                        sumRank = sumRank + graphData[j].y; 
                        Avgrank = parseInt(sumRank) / parseInt(popularity);
 
                    }
                }
                if (countries.includes(title)) {}
                else {
                    finalData.push({ "x": title, "country": country, "name": title, "z": popularity, "y": Avgrank });
                    countries.push(title)
                }

            }
            console.log(finalData.toString());


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
                    text: 'Most popular albums'
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
                    pointFormat: '<tr><th colspan="2"><h3>{point.title}</h3></th></tr>' +
                        '<tr><th>Year of release:</th><td>{point.x}g</td></tr>' +
                        '<tr><th>Average ranking:</th><td>{point.y}g</td></tr>' +
                        '<tr><th>Popularity:</th><td>{point.z}</td></tr>',
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
                    data: finalData
                }]

            });

        })







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
