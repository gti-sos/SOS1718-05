/*global angular*/
angular.module("MusicApp").controller("ListBestCtrl", ["$scope", "$http", function($scope, $http) {
    var bests = "api/v1/best-stats";
    var limit = 10;
    var offset = 0;
    console.log("List Best Controller inicializado.")
    //////////////////////////////////////////////////////////////////////////////////////////////GET
   
    function get() {

        $http.get(bests + "?limit=" + limit + "&offset=" + offset).then(function(response) {
           $scope.bests = response.data;
            console.log(response.status);
        }, function Error(response) {
            $scope.bests = [];
        });
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////PAGINACION       
    $scope.getSiguiente = function() {

        $http.get(bests + "?limit=" + limit + "&offset=" + offset).then(function(response) {
            if ((response.data).length == 10) {
                offset = offset + 10;
            }
            $http.get(bests + "?limit=" + limit + "&offset=" + offset).then(function(response) {
                $scope.bests = response.data;

            });

        }, function Error(response) {
            $scope.bests = [];
        });


    }

    $scope.getAnterior = function() {

        if (offset >= 10) {
            offset = offset - 10;
        }
        $http.get(bests + "?limit=" + limit + "&offset=" + offset).then(function(response) {
            $scope.bests = response.data;
        }, function Error(response) {
            $scope.bests = [];
        });
    }

    $scope.seguro = function(apikey) {
        $scope.status = "";
        if (apikey == "SOS1718-05") {
            $http.get("/api/v1/secure/best-stats?apikey=" + apikey).then(function(response) {
                $scope.bests = response.data;
                console.log(response.data);
            })
        }
        else {
            $scope.status = "Error: Contraseña incorrecta."
        }


    }


    $scope.Busqueda = function(from, to) {
        $http.get(bests + "?from=" + JSON.parse(from) + "&to=" + JSON.parse(to)).then(function(response) {
            $scope.bests = response.data;
        })
    }


    $scope.deleteAll = function() {

        $http.delete(bests).then(function(response) {

            $scope.status = "Se elimiaron los objetos con exito.";
            get();

        });
    }

    $scope.deleteBest = function(country, year) {

        $http.delete(bests + "/" + country + "/" + year.toString()).then(function(response) {

            if (($scope.bests).length == 1) {
                $scope.status = "Se ha eliminado el objeto con exito.";

                $scope.getAnterior();

            }
            else {
                $scope.status = "Se ha eliminado el objeto con exito.";
                get();
            }
        });   

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////POST

    $scope.addBest = function() {
        $http.post(bests, $scope.newBest).then(function successCallback(response) {
            $scope.status = "El objeto se creo con exito.";
            get();
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

        $scope.newBest = {};
    }

    $scope.inicializar = function() {
        $http.get(bests + "/loadInitialData").then(function(response) {
            get();
            $scope.status = "Se han creado todos los objetos con exito."
        })


    }
    get();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////       
}]);
