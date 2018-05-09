/*global angular Highcharts*/
angular.module("MusicApp").controller("hchartsWorldCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("/api/v1/world-stats")
        .then(function(response) {
            
            var datax = [];
  
        response.data.forEach(v => {
            var vic= {};
            Object.keys(v).forEach(o => {
                console.log(v["sale"]);
               
                if (o == "sale") {
                    vic["y"] = v[o];
                   
                }else if(o == "album"){
                vic["name"] = v[o]
                 }
                })
        datax.push(vic);
            
        });
        console.log("aaaaaaaaaaaaaaaaaa");
        console.log(datax);
        Highcharts.chart('hchartsWorld', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: datax
    }]
});

     ///////
            
        });
}]);