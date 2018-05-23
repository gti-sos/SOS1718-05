/*global angular*/
/*global Highcharts*/
/*global google*/
/*global tauCharts*/

 
angular.module("MusicApp").controller("ListCountryCtrl", ["$scope", "$http", function($scope, $http) {
    var countryStats = "/api/v1/country-stats";
    var limit = 10;
    var offset = 0;

    var data = [];
      


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
        var error = true
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
                error = false
                $scope.status = "Status 409. Another item already exists with the same keys (" + newAlbum.country + ", " + newAlbum.rank + ")."
            }
        }); 
        if (error == true && !(newAlbum.country == "" || newAlbum.rank == "" || newAlbum.title == "")) {
            $http.post(countryStats, newAlbum).then(function(response) {

                $scope.status = "Status 201. New item created  (" + newAlbum.country + ", " + newAlbum.rank + ").";
                $scope.get();
            })
        }
        else if (error == true) {
            $scope.status = "Status 400. New items cant have blank parameters."
        }
        $scope.newAlbum = {};
        error = true;
    }

    /*$scope.addCountry = function() {
            $http.post(countryStats, $scope.newAlbum).then(function successCallback(response) {
                $scope.status = "El objeto se creo con exito.";
                $scope.get();
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status)
                switch (response.status) {
                    case 400:
                        $scope.status = "Error: debes introducir todos los parametros";
                        break;
                    case 409:
                        $scope.status = "Error: el recurso ya existe.";
                        break;
                    
                    default:
                        $scope.status = "Error: algo no esta funcionando bien.";
                }
            });
     
         $scope.newAlbum={};
     } */




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
            console.log("mostrando la api completa");
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

    $http.get("/api/v1/country-stats/analytics3")

        .then(function(response) {
            var datasource = response.data;

            console.log("AHHHHHH" + response.data);
            var chart = new tauCharts.Chart({
                guide: {
                    x: { nice: false, padding: 20, label: { text: 'Years', padding: 35 } },
                    y: { nice: false, padding: 20, label: { text: 'Rank', padding: 35 } },
                    showGridLines: 'xy'
                },

                data: datasource,
                type: 'line',
                x: 'cycleTime',
                y: 'effort',
                color: 'team', // every team will be represented by different color
            });

            chart.renderTo('#line');


        })

    ///////////////////////////////////////////////////////////////////////////////////////////////////////       
}]);
