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
        $http.get("proxyST/api/v2/students-an").then(function(response) {


            var datos = [];
            var datosYear = [];
            var datosMale = [];
            var datosFemale = [];
            var datosMale = [];
            var datosBoth = [];
            var yearsAlbums = []; 
 
            datosYear = response.data.map(function(student) { if (!contains(datosYear, student.year)) { return student.year } })
            var yearsFin = datosYear.filter(function(item, pos) {
                return datosYear.indexOf(item) == pos;
            })

            yearsFin.sort(sortNumber);
            yearsFin.forEach(y => {
                var obj = "";
                var album = (best.data.filter(d => d.year == y).map(py =>{return py.title})[0])
                if(album == null){album = "no ranking album"}
                obj = "year " + y + "(" + album +  " was released)";
                
                var datoMale = response.data.filter(student => student.year == y && student.gender == "male").map(d => { return d.popinuniversity })
                
                if(datoMale == ""){
                    console.log("no male data for year " + y)
                    datoMale = 0;}
                console.log("male data for year " + y + " = " + datoMale)
                
                var datoFemale = response.data.filter(student => student.year == y && student.gender == "female").map(d => { return d.popinuniversity })
                
                if(datoFemale == ""){ 
                    console.log("no female data for year " + y)
                    datoFemale = 0;}
                console.log("female data for year " + y + " = " + datoFemale)
                
                var datoBoth = response.data.filter(student => student.year == y && student.gender == "both").map(d => { return d.popinuniversity })
                
                if(datoBoth == ""){
                    console.log("no both data for year " + y)
                    datoBoth = 0;}
                console.log("both data for year " + y + " = " + datoBoth)
                
                datosMale.push( Math.round(datoMale * 100) / 100)
                datosFemale.push(Math.round(datoFemale * 100) / 100)
                datosBoth.push(Math.round(datoBoth * 100) / 100)
                
                yearsAlbums.push(obj);
                
            })
            
            console.log("años a usar: " + yearsAlbums + " len : " + yearsAlbums.length)
            console.log("datos male: " + datosMale + " len : " + datosMale.length)
            console.log("datos female: " + datosFemale  + " len : " + datosFemale.length)
            console.log("datos both: " + datosBoth  + " len : " + datosBoth.length)
            

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
                    categories: yearsAlbums
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
                } , {name: 'Both', data: datosBoth}
                ]
            });



        })

    })

}])
