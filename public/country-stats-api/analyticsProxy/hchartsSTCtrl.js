/*global angular Highcharts */
/*global google*/
angular.module("MusicApp").controller("hchartsSTCtrl", ["$scope", "$http", function($scope, $http) {


    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }

    function sortNumber(a, b) {
        return a - b;
    }



    var sort_by = function(field, reverse, primer) {

        var key = primer ?
            function(x) { return primer(x[field]) } :
            function(x) { return x[field] };

        reverse = !reverse ? 1 : -1;

        return function(a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }

    $http.get("api/v1/country-stats").then(function(best) {
        $http.get("https://sos1718-08.herokuapp.com/api/v2/students-an").then(function(response) {

            console.log(response.data.sort(sort_by('province', false, function(a) { return a.toUpperCase() })));

            var datos = [];
            var datosYear = [];
            var datosMale = [];
            var datosFemale = [];

            datosYear = response.data.map(function(student) { if (!contains(datosYear, student.year)) { return student.year } })
            var yearsFin = datosYear.filter(function(item, pos) {
                return datosYear.indexOf(item) == pos;
            })

            yearsFin.sort(sortNumber);

            for (var i = 0; i < yearsFin.length; i++) {
                response.data.filter(student => student.year == yearsFin[i] && student.gender == "male").map(d => { datosMale.push(d.popinuniversity) })
                response.data.filter(student => student.year == yearsFin[i] && student.gender == "female").map(d => { datosFemale.push(d.popinuniversity) })
            }

            console.log("datamale: " + datosMale);
            console.log("datafemale: " + datosFemale);
            console.log("years: " + yearsFin)


            Highcharts.chart('container', {
                chart: {
                    type: 'area',
                    inverted: true
                },
                title: {
                    text: 'Population in university by gender'
                },
                subtitle: {
                    style: {
                        position: 'absolute',
                        right: '0px',
                        bottom: '10px'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                xAxis: {
                    categories: datosYear
                },
                yAxis: {
                    title: {
                        text: 'Number of units'
                    },
                    allowDecimals: false,
                    min: 0
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0.5
                    } 
                },
                series: [{
                    name: 'Male',
                    data: datosMale
                }, {
                    name: 'Female',
                    data: datosFemale
                }]
            });



        })

    })

}])
