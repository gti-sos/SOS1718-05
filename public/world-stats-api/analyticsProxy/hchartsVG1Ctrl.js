/*global angular Highcharts*/
angular.module("MusicApp").controller("hchartsVG1Ctrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/world-stats").then(function(world) {
    $http.get("proxyVG/api/v1/builders").then(function(build) {
            
            var datax = [];
  //
  world.data.forEach(v => {
            var vic= {};
            Object.keys(v).forEach(o => {
                console.log(v["sale"]);
               
                if (o == "sale") {
                    vic["y"] = v[o];
                   
                }else if(o == "country"){
                vic["name"] = v[o]
                 }
                })
        datax.push(vic);
            
        });
  
        build.data.forEach(v => {
            var vic= {};
            Object.keys(v).forEach(o => {
                console.log(v["sale"]);
               
                if (o == "pole") {
                    vic["y"] = v[o];
                   
                }else if(o == "country"){
                vic["name"] = v[o]
                 }
                })
        datax.push(vic);
            
        });
        console.log("aaaaaaaaaaaaaaaaaa");
        console.log(datax);
      Highcharts.chart('container', {
    chart: {
        type: 'funnel'
    },
    title: {
        text: 'builder and world hcharts analytics'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                softConnector: true
            },
            center: ['40%', '50%'],
            neckWidth: '30%',
            neckHeight: '25%',
            width: '80%'
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Country-Sale / Country-Pole',
        data: datax
    }]

});

     ///////
            
        });
     });
}]);