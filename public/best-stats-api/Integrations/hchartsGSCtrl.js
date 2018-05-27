/*global angular Highcharts */
angular.module("MusicApp").controller("hchartsGSCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(best) {
        $http.get("proxyGS/api/v1/goals-stats").then(function(goals) {

            var datos = [];
            datos.push({
                id: "2012",
                name: '2012',
                color: "grey"
            }, {
                id: "2013",
                name: '2013',
                color: "red"
            }, {
                id: "2014",
                name: '2014',
                color: 'yellow'
            }, {
                id: "2015",
                name: '2015',
                color: "green"
            }, {
                id: "2016",
                name: '2016',
                color: "brown"
            }, {
                id: "2017",
                name: '2017',
                color: 'pink'
            }, {
                id: "2018",
                name: '2018',
                color: "dark"
            })
            best.data.forEach(p => {
                var obj = {};
                Object.keys(p).forEach(o => {



                    if (o == "year") {
                        obj["parent"] = (p[o]).toString();

                    }
                    else if (o == "song") {
                        obj["name"] = p[o];
                        obj["value"] = 1;
                    }


                })
                datos.push(obj);

            });
            console.log(goals.data);
            goals.data.forEach(p => {
                var obj = {};
                Object.keys(p).forEach(o => {



                    if (o == "year") {
                        obj["parent"] = (p[o]).toString();;

                    }
                    else if (o == "team") {
                        obj["name"] = p[o]
                        obj["value"] = 1;
                    }


                })
                datos.push(obj);

            });
            console.log(datos)


            Highcharts.getOptions().colors.splice(0, 0, 'transparent');


            Highcharts.chart('container', {

                chart: {
                    height: '50%'
                },

                title: {
                    text: 'Song and team per year'
                },
                
                series: [{
                    type: "sunburst",
                    data: datos,
                    allowDrillToNode: true,
                    cursor: 'pointer',
                    dataLabels: {
                        format: '{point.name}',
                        filter: {
                            property: 'innerArcLength',
                            operator: '>',
                            value: 16
                        }
                    },
                    levels: [{
                            level: 1,
                            levelIsConstant: false,
                            dataLabels: {
                                rotationMode: 'parallel',
                                filter: {
                                    property: 'outerArcLength',
                                    operator: '>',
                                    value: 64
                                }
                            }
                        }, {
                            level: 2,
                            colorByPoint: true,
                            dataLabels: {
                                rotationMode: 'parallel'
                            }
                        },
                        {
                            level: 3,
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            }
                        }, {
                            level: 4,
                            colorVariation: {
                                key: 'brightness',
                                to: 0.5
                            }
                        }
                    ]

                }],
                tooltip: {
                    headerFormat: "",
                    pointFormat: 'Songs and teams in <b>{point.name}</b>'
                }
            });




        })






    })



}])
