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
        .when("/analytics/googleBest",{
            templateUrl: "best-stats-api/analytics/googleBest.html",
            controller: "googleBestCtrl"
        })
        .when("/analytics/visBest",{
            templateUrl:"best-stats-api/analytics/visBest.html",
            controller: "visBestCtrl"
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
        .when("/analytics/highchartsCountry", {
            templateUrl: "country-stats-api/analytics/highchartsCountry.html",
            controller: "highchartsCountryCtrl"
        })

        //////////
        .when("/world-stats", {
            templateUrl: "world-stats-api/listWorld.html",
            controller: "ListWorldCtrl"
        })
        .when("/world-stats/:country/:year", {
            templateUrl: "world-stats-api/editWorld.html",
            controller: "EditWorldCtrl"
        })
        .when("/analytics/highchartsWorld",{
            templateUrl: "world-stats-api/analytics/hchartsWorld.html",
            controller: "hchartsWorldCtrl"
        })
        .when("/analytics/googleWorld",{
            templateUrl: "world-stats-api/analytics/googleWorld.html",
            controller: "googleWorldCtrl"
        })
        .when("/analytics/visWorld",{
            templateUrl:"world-stats-api/analytics/visWorld.html",
            controller: "visWorldCtrl"
        });
        

    console.log("App inicializada con exito")

});
