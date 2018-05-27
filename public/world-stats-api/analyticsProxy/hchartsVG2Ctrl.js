/*global angular Highcharts*/
angular.module("MusicApp").controller("hchartsVG2Ctrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/world-stats").then(function(world) {
    $http.get("https://sos1718-07.herokuapp.com/api/v1/global-terrorism-data").then(function(transfer) {
       console.log(transfer.data);     
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
  //
  transfer.data.forEach(v => {
            var vic= {};
            Object.keys(v).forEach(o => {
                console.log(v["sale"]);
               
                if (o == "imonth") {
                    vic["y"] = v[o];
                   
                }else if(o == "city"){
                vic["name"] = v[o]
                 }
                })
        datax.push(vic);
            
        });
  //
       
        console.log("aaaaaaaaaaaaaaaaaa");
        console.log(datax);
      

     ///////
    

Highcharts.chart('container', {
    chart: {
        type: 'pyramid'
    },
    title: {
        text: 'Sales pyramid',
        x: -50
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
            width: '80%'
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Unique users',
        data: datax
    }]
});
            
        });
     });
}]);