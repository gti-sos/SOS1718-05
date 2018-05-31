/*global angular Highcharts */
/*global google*/
/*global tauCharts*/

angular.module("MusicApp").controller("anychartsIMDBCtrl", ["$scope", "$http", function($scope, $http) {


    var newData = [];
    var countriesData = [];

    ///apikey = 5W6RqBxs5IwMaNpDgOpMY4chmqnoD5lCZUff6Ev6
    //search sample = https://imvdb.com/api/v1/search/videos?q=

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
            var country = countryData.data[iter].country
            if (!contains(countriesData, country)) {
                countriesData.push(country);
            }
        }
        console.log("countries: " + countriesData)

        function getCountryData(country) {
            var obj = {};
            var items;
            var year;
            $http.get("https://imvdb.com/api/v1/search/videos?q=" + country).then(function(response) {

                items = response.data.total_results;
                year = response.data.results[0].year;
                console.log(items);
                obj["country"] = country;
                obj["index"] = newData.length;
                obj["numItems"] = items;
                obj["size"] = items;
                obj["priority"] = "low";
                newData.push(obj);
                console.log("new obj : (country   =" + obj.country + "year = " + obj.index + ", effort  = " + obj.numItems + ")");
                if (newData.length == countriesData.length) {
                    console.log(newData);


                    var defData = newData;

                    var chart = new tauCharts.Chart({
                        guide: {
                            x: { label: 'Year of release' }, // custom label for X axis
                            y: { label: 'Number or items in IMVDB' }, // custom label for Y axis
                            
                        },
                        data: defData,
                        type: 'scatterplot',
                        x: 'index',
                        y: 'numItems',
                        color: 'country',
                        size: 'size'
                    });

                    chart.renderTo('#scatter');
                }
            });
        }

        for (var iter = 0; iter < countriesData.length; iter++) {
            var countryNew = countriesData[iter];
            getCountryData(countryNew);

        }





    })


}])
