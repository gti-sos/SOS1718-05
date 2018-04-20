/*global angular*/
angular.module("MusicApp",["ngRoute"]).config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"inicio.html"
    }).when("/best-stats",{
        templateUrl: "best-stats-api/listBest.html",
        controller: "ListBestCtrl"
    })
    .when("/best-stats/:country/:year",{
        templateUrl: "best-stats-api/editBest.html",
        controller: "EditBestCtrl"
    })
//////Cambios manu
    
    .when("/country-stats",{
        templateUrl: "country-stats/listBest.html",
        controller: "ListCountryCtrl"
    })
    .when("/country-stats/:country/:rank",{
        templateUrl: "country-stats/editBest.html",
        controller: "EditCountryCtrl"
    });
});