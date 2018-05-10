/*global angular Highcharts*/
angular.module("MusicApp").controller("hchartsVG2Ctrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/world-stats").then(function(world) {
    $http.get("https://sos1718-04.herokuapp.com/api/v1/medical-attention-rates").then(function(transfer) {
            
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
  
        transfer.data.forEach(v => {
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
      

     ///////
     Highcharts.chart('container', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: 'Browser market shares at a specific website, 2014'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        data: datax
    }]
});
            
        });
     });
}]);