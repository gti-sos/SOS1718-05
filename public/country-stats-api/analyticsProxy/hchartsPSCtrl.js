/*global angular Highcharts */
/*global google*/
angular.module("MusicApp").controller("hchartsPSCtrl", ["$scope", "$http", function($scope, $http) {
    function sortNumber(a, b) {
        return a - b;
    }
    
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }
    
    $http.get("api/v1/country-stats").then(function(best) {
        $http.get("https://sos1718-04.herokuapp.com/api/v2/graduation-rates").then(function(response) {
            var data = [];

            var datosYear = response.data.map(function(d) { return d.year })
            var yearsFin = datosYear.filter(function(item, pos) {
                return datosYear.indexOf(item) == pos;
            })

            yearsFin.sort(sortNumber);
            var provincias = response.data.map(function(d) { return d.province })
            var provinciasFin = provincias.filter(function(item, pos) {
                return provincias.indexOf(item) == pos;
            })

            console.log(yearsFin)
            console.log(provinciasFin)

            yearsFin.forEach(y => {
                var obj = {};
                obj["name"] = "year " + y;
                var rates = [] 
                    var provinciasYear = response.data.filter(d => d.year == y ).map(py =>{return py.province})
                    provinciasFin.forEach(p =>{
                        if(contains(provinciasYear, p)){
                            rates.push(response.data.filter(d => d.year == y && d.province == p).map(py =>{return parseFloat(py["public-school"])})[0])
                        }
                        else{
                            rates.push(0);
                            console.log("aggg")
                        }
                    })
                
                
                obj["data"] = rates;
                data.push(obj);
            })

            console.log(data);

            Highcharts.chart('container', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Public school graduation rates by region and year'
                },
                subtitle: {
                    text: 'Empty bars mean no data stored'
                },
                xAxis: {
                    categories: provinciasFin,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Graduation rates(%)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' %'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                }, 
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: data
            });






        })

    })


}])
