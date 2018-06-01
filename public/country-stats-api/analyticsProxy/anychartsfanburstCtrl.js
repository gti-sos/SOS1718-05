/*global angular Highcharts */
/*global google*/
/*global zingchart*/

angular.module("MusicApp").controller("anychartsfanburstCtrl", ["$scope", "$http", function($scope, $http) {

    var textDump = "";
    var yearsData = [];
    var index = 0;

    //search sample = https://www.pricecharting.com/api/products?t=c0b53bce27c1bdab90b1605249e600dc43dfd1d5&q=canada
    //key = c6e1183a1e4eccbe190708a7b080711f
    //data = https://igdb.github.io/api/examples/

    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }


    $http.get("api/v1/country-stats").then(function(countryData) {

        for (var iter = 0; iter < countryData.data.length; iter++) {
            var country = countryData.data[iter].year
            if (!contains(yearsData, country)) {
                yearsData.push(country);
            }
        }


        console.log(yearsData);

        function getCountryData(year) {
            var obj = {};
            $http.get("https://api.themoviedb.org/3/discover/movie?primary_release_year=" + year + "&sort_by=vote_average.desc&api_key=c6e1183a1e4eccbe190708a7b080711f").then(function(response) {
                var products = response.data.results;
                console.log(products[1].title)
                for (var int = 0; int < 6; int++) {
                    textDump += products[int].title;

                    if (textDump.length > 40*yearsData.length) {
                        var myConfig = {
                            type: 'wordcloud',
                            options: {
                                text: textDump
                            }
                        };

                        zingchart.render({
                            id: 'myChart',
                            data: myConfig,
                            height: 400,
                            width: '100%'
                        });

                        console.log(myConfig.options)
                    }
                }
            });




        }

        for (var iter = 0; iter < yearsData.length; iter++) {
            var countryNew = yearsData[iter];
            getCountryData(countryNew);

        }





    })


}])
