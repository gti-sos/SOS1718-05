/*global angular Highcharts */
/*global google*/

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
            var itemsCountry = 0;
            $http.get("https://imvdb.com/api/v1/search/videos?q=" + country).then(function(response) {

                items = response.data.total_results;
                console.log(items);
                obj["country"] = country;
                obj["items"] = items;
                newData.push(obj);
                console.log("new obj : (" + obj.country + ", " + obj.items + ")");
                if (newData.length == countriesData.length) {
                    console.log(newData);
                }
            });
        }

        for (var iter = 0; iter < countriesData.length; iter++) {
            var countryNew = countriesData[iter];
            getCountryData(countryNew);

        }
        
        



    })


}])
