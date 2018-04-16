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
    });
});