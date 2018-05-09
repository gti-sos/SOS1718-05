/*global angular Highcharts*/
angular.module("MusicApp").controller("hchartsMACtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(best) {
        $http.get("https://sos1718-04.herokuapp.com/api/v1/medical-attention-rates").then(function(medical) {
            
            var datos = [];
            medical.data.forEach(p => {
                var obj = {};
                var s = "";
                var boolean = true;
                Object.keys(p).forEach(o => {


                  
                    
                    if (o == "year") {
                        obj["y"] = p[o];
                        if (boolean) {
                            s = (p[o]).toString();
                            boolean = false;
                        }
                        else {
                            s = s + ", " + p[o];
                        }
                    }
                    else if (o == "nursing") {

                        s = s + " ," + (p[o]).toString();

                    }


                })
                obj["name"] = s;
                datos.push(obj);

            });
            console.log(medical.data);
            best.data.forEach(p => {
                var obj = {};
                var s = "";
                var boolean = true;
                Object.keys(p).forEach(o => {



                    if (o == "year") {
                        obj["y"] = p[o]
                        if (boolean) {
                            s = (p[o]).toString();
                            boolean = false;
                        }
                        else {
                            s = s + ", " + p[o];
                        }

                    }
                    else if (o == "album") {

                        s = s + " ," + (p[o]).toString();
                    }


                })
                obj["name"] = s;
                datos.push(obj);

            });
            console.log(datos)



            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    height: '150%'
                
                },
                title: {
                    text: 'Albums and nursing per years.'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: datos
                }]
            });





        });
    });
}]);
