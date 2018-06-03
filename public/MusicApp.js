/*global angular*/
angular.module("MusicApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "inicio.html"
        })
        .when("/analytics",{
            templateUrl: "analytics.html"
        })
        .when("/integrations",{
            templateUrl:"integrations.html"
        })
        .when("/about",{
            templateUrl:"about.html"
        })
        
        ////Julio
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
        .when("/analytics/visBest",{
            templateUrl:"best-stats-api/analytics/visBest.html",
            controller: "visBestCtrl"
        })
        .when("/analytics/GeoBest",{
            templateUrl:"best-stats-api/analytics/googleGeoBest.html",
            controller:"googleGeoBestCtrl"
        })
        .when("/analytics/highchartsGS",{
            templateUrl:"best-stats-api/Integrations/hchartsGS.html",
            controller: "hchartsGSCtrl"
        })
        .when("/analytics/highchartsMA",{
            templateUrl:"best-stats-api/Integrations/hchartsMA.html",
            controller:"hchartsMACtrl"
        })
        .when("/analytics/googleChartsF",{
            templateUrl:"best-stats-api/Integrations/googleChartsF.html",
            controller:"googleChartsFCtrl"
        })
        .when("/analytics/googleChartsS",{
            templateUrl:"best-stats-api/Integrations/googleChartsS.html",
            controller:"googleChartsSCtrl"
            
        })
        .when("/analytics/visjsS",{
            templateUrl:"best-stats-api/Integrations/visjsS.html",
            controller:"visjsSCtrl"
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
        .when("/analytics/highchartsST",{
            templateUrl:"country-stats-api/analyticsProxy/hchartsST.html",
            controller: "hchartsSTCtrl"
        })
        .when("/analytics/highchartsPS",{
            templateUrl:"country-stats-api/analyticsProxy/hchartsPS.html",
            controller: "hchartsPSCtrl"
        })
        .when("/analytics/highchartsDisc",{
            templateUrl:"country-stats-api/analyticsProxy/hchartsDisc.html",
            controller: "hchartsDiscCtrl"
        })
        .when("/analytics/highchartsLastFM",{
            templateUrl:"country-stats-api/analyticsProxy/hchartsLastFM.html",
            controller: "hchartsLastFMCtrl"
        })
        .when("/analytics/zingchartsDisc",{
            templateUrl:"country-stats-api/analyticsProxy/zingchartsDisc.html",
            controller: "zingchartsDiscCtrl"
        })
        .when("/analytics/anychartsIMDB",{
            templateUrl:"country-stats-api/analyticsProxy/anychartsIMDB.html",
            controller: "anychartsIMDBCtrl"
        })
        .when("/analytics/anychartsfanburst",{
            templateUrl:"country-stats-api/analyticsProxy/anychartsfanburst.html",
            controller: "anychartsfanburstCtrl"
        })

        //////////vicente
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
        .when("/analytics/morrisWorld",{
            templateUrl:"world-stats-api/analytics/morrisWorld.html",
            controller: "morrisWorldCtrl"
        })
        .when("/analytics/GeoWorld",{
            templateUrl:"world-stats-api/analytics/googleGeoWorld.html",
            controller:"googleGeoWorldCtrl"
        })
        .when("/analytics/highchartsVG1",{
            templateUrl:"world-stats-api/analyticsProxy/hchartsVG1.html",
            controller: "hchartsVG1Ctrl"
        })
        .when("/analytics/highchartsVG2",{
            templateUrl:"world-stats-api/analyticsProxy/hchartsVG2.html",
            controller: "hchartsVG2Ctrl"
        })
        .when("/analytics/googlechartsVG3",{
            templateUrl:"world-stats-api/analyticsProxy/googlechartsVG3.html",
            controller: "googlechartsVG3Ctrl"
        })
        .when("/analytics/googlechartsVG4",{
            templateUrl:"world-stats-api/analyticsProxy/googlechartsVG4.html",
            controller: "googlechartsVG4Ctrl"
        })
        .when("/analytics/morrisVG5",{
            templateUrl:"world-stats-api/analyticsProxy/morrisVG5.html",
            controller: "morrisVG5Ctrl"
        })
        .when("/analytics/tauChartsVG6",{
            templateUrl:"world-stats-api/analyticsProxy/tauChartsVG6.html",
            controller: "tauChartsVG6Ctrl",
            //css: "tauCharts.css"
        })
        
        //////////grupal
        .when("/analytics/highchartsGrupal",{
            templateUrl:"grupal-analytic/highchartsGrupal.html",
            controller: "highchartsGrupalCtrl"
        })
        ;
        

    console.log("App inicializada con exito")

});