/*global angular*/
/*global Highcharts*/
/*global google*/
/*global tauCharts*/

angular.module("MusicApp").controller("highchartsCountryCtrl", ["$scope", "$http", function($scope, $http) {

    var countryStats = "/api/v1/country-stats";
    var limit = 10;
    var offset = 0;

    var data = [];


    $http.get("/api/v1/country-stats/analytics")
        .then(function(response) {
            console.log(response.data)
            Highcharts.chart('analytics', {

                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },

                legend: {
                    enabled: false
                },

                title: {
                    text: 'Average ranking and popularity of albums'
                },


                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: 'Year of release'
                    },
                    labels: {
                        format: '{value}'
                    },
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 1970,
                        label: {
                            rotation: 0,
                            y: 15,
                            style: {
                                fontStyle: 'italic'
                            },
                            text: ''
                        },
                        zIndex: 3
                    }]
                },

                yAxis: {
                    reversed: true,
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: 'Average rank worldwide'
                    },
                    labels: {
                        format: '{value}'
                    },
                    maxPadding: 0.2,
                    plotLines: [{
                        color: 'black',
                        dashStyle: 'dot',
                        width: 2,
                        value: 0,
                        label: {
                            align: 'right',
                            style: {
                                fontStyle: 'italic'
                            },
                            text: '',
                            x: -10
                        },
                        zIndex: 3
                    }]
                },

                tooltip: {
                    useHTML: true,
                    headerFormat: '<table>',
                    pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                        '<tr><th>Year of release:</th><td>{point.x}</td></tr>' +
                        '<tr><th>Average ranking:</th><td>{point.y}</td></tr>' +
                        '<tr><th>Certifications:</th><td>{point.certifications}</td></tr>' +
                        '<tr><td>Ranked in {point.z} countries</td></tr>',
                    footerFormat: '</table>',
                    followPointer: true
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },

                series: [{
                    name: 'data',
                    data: response.data
                }]

            });



        })


    $http.get("/api/v1/country-stats/analytics2")
        .then(function(response) {
            google.charts.load('current', {
                'packages': ['geochart'],
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable([
                    ['Country', 'Albums in database'],
                    [response.data[0].country, response.data[0].popularity],
                    [response.data[1].country, response.data[1].popularity],
                    [response.data[2].country, response.data[2].popularity],
                    [response.data[3].country, response.data[3].popularity],
                    [response.data[4].country, response.data[4].popularity],
                    [response.data[5].country, response.data[5].popularity]
                ]);

                var options = {}; 

                var chart = new google.visualization.GeoChart(document.getElementById('mapCountries'));

                chart.draw(data, options);
            }


        }) 

    $http.get("/api/v1/country-stats/analytics3")

        .then(function(response) {
            var datasource = response.data;

            var chart = new tauCharts.Chart({
                guide: {
                    x: { nice: false, padding: 20, label: { text: 'Years', padding: 35 } },
                    y: { nice: false, padding: 20, label: { text: 'Rank', padding: 35 } },
                    showGridLines: 'xy'
                },

                data: datasource,
                type: 'line',
                x: 'cycleTime',
                y: 'effort',
                color: 'team', // every team will be represented by different color
            });

            chart.renderTo('#line');


        })


}]);
