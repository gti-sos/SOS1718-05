/*global angular*/
angular.module("MusicApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "inicio.html"
        })
        .when("/analytics",{
            templateUrl: "analytics.html"
        })
        .when("/best-stats", {
            templateUrl: "best-stats-api/listBest.html",
            controller: "ListBestCtrl"
        })
        .when("/best-stats/:country/:year", {
            templateUrl: "best-stats-api/editBest.html",
            controller: "EditBestCtrl"
        })
        .when("/analytics/highchartsBest",{
            templateUrl: "best-stats-api/analytics/hchartsBest.html",
            controller: "hchartsBestCtrl"
        })
        //////Cambios manu

        .when("/country-stats", {
            templateUrl: "country-stats-api/listCountry.html",
            controller: "ListCountryCtrl"
        })
        .when("/country-stats/:country/:rank", {
            templateUrl: "country-stats-api/editCountry.html",
            controller: "EditCountryCtrl"
        })

        //////////
        .when("/world-stats", {
            templateUrl: "world-stats-api/listWorld.html",
            controller: "ListWorldCtrl"
        })
        .when("/world-stats/:country/:year", {
            templateUrl: "world-stats-api/editWorld.html",
            controller: "EditWorldCtrl"
        });

    console.log("App inicializada con exito")

});
