/*global angular Highcharts*/

angular.module("MusicApp").controller("highchartsGrupalCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(best) {
        $http.get("api/v1/world-stats").then(function(world) {
            $http.get("api/v1/country-stats").then(function(country) {
                
                
                
    Highcharts.chart('container', {

    chart: {
        type: 'variwide'
    },

    title: {
        text: 'Songs per year'
    },

    subtitle: {
        text: "songs"
    },

    xAxis: {
        type: 'category',
        title: {
            text: 'Column widths are proportional to GDP'
        }
    },

    legend: {
        enabled: false
    },

    series: [{
        name: 'Labor Costs',
        data: [
            ['Norway', 50.2, 335504],
            ['Denmark', 42, 277339],
            ['Belgium', 39.2, 421611],
            ['Sweden', 38, 462057],
            ['France', 35.6, 2228857],
            ['Netherlands', 34.3, 702641],
            ['Finland', 33.2, 215615],
            ['Germany', 33.0, 3144050],
            ['Austria', 32.7, 349344],
            ['Ireland', 30.4, 275567],
            ['Italy', 27.8, 1672438],
            ['United Kingdom', 26.7, 2366911],
            ['Spain', 21.3, 1113851],
            ['Greece', 14.2, 175887],
            ['Portugal', 13.7, 184933],
            ['Czech Republic', 10.2, 176564],
            ['Poland', 8.6, 424269],
            ['Romania', 5.5, 169578]

        ],
        dataLabels: {
            enabled: true,
            format: '€{point.y:.0f}'
        },
        tooltip: {
            pointFormat: 'Labor Costs: <b>€ {point.y}/h</b><br>' +
                'GDP: <b>€ {point.z} million</b><br>'
        },
        colorByPoint: true
    }]

});
            
                
                
                
                
            })
        })
    })   
}])