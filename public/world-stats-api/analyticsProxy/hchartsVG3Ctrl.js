/*global angular Highcharts*/
angular.module("MusicApp").controller("hchartsVG3Ctrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/world-stats").then(function(world) {
    $http.get("https://api.maas2.jiinxt.com/").then(function(build) {
            
            var datax = [];
  //
  world.data.forEach(v => {
            var vic= [];
            Object.keys(v).forEach(o => {
                
                if (o == "country") {
                    vic.push(v[o]);
                   
                }else if(o == "sale"){
                vic.push(v[o]);
                 }else if(o == "year"){
                vic.push(v[o]);
                 }
                })
        datax.push(vic);
            
        });
        
      
  console.log(datax);
 Highcharts.chart('container', {

    chart: {
        type: 'variwide'
    },

    title: {
        text: 'Labor Costs in Europe, 2016'
    },

    subtitle: {
        text: 'Source: <a href="http://ec.europa.eu/eurostat/web/' +
            'labour-market/labour-costs/main-tables">eurostat</a>'
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
        data: datax,
        dataLabels: {
            enabled: true,
            format: 'year{point.y:.0f}'
        },
        tooltip: {
            pointFormat: 'Labor Costs: <b>€ {point.y}/h</b><br>' +
                'GDP: <b>€ {point.z} million</b><br>'
        },
        colorByPoint: true
    }]

});


     ///////
            
        });
     });
}]);