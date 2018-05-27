/*global angular Highcharts*/

angular.module("MusicApp").controller("highchartsGrupalCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(best) {
        $http.get("api/v1/world-stats").then(function(world) {
            $http.get("api/v1/country-stats").then(function(country) {
                console.log(best.data);
                console.log(world.data);
                console.log(country.data);
                
            var arr = [];   
            best.data.forEach(f=>{
            var arr2 = [];
            
            Object.keys(f).forEach(p=>{
                if(p == "year"){
                    arr2.push(f[p]);
                    arr2.push(f[p]);
                }else if(p == "song"){
                    arr2.unshift(f[p]);
                }
                    
                    
                })
            
            
            arr.push(arr2);
        })
        
         world.data.forEach(f=>{
            var arr2 = [];
            
            Object.keys(f).forEach(p=>{
                if(p == "year"){
                    arr2.push(f[p]);
                    arr2.push(f[p]);
                }else if(p == "album"){
                    arr2.unshift(f[p]);
                }
                    
                    
                })
            
            
            arr.push(arr2);
        })
        
         country.data.forEach(f=>{
            var arr2 = [];
            
            Object.keys(f).forEach(p=>{
                if(p == "year"){
                    arr2.push(f[p]);
                    arr2.push(f[p]);
                }else if(p == "title"){
                    arr2.push(f[p]);
                }
                    
                    
                })
            
            
            arr.push(arr2);
        })
         console.log(arr);       
                
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
        data:arr,
        dataLabels: {
            enabled: true,
            format: '{point.y:.0f}'
        },
        tooltip: {
            pointFormat: 'Labor Costs: <b> {point.y}/h</b><br>' +
                'GDP: <b> {point.z} million</b><br>'
        },
        colorByPoint: true
    }]

});
            
                
                
                
                
            })
        })
    })   
}])