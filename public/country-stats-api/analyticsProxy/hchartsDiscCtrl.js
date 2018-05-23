/*global angular Highcharts */
/*global google*/

angular.module("MusicApp").controller("hchartsDiscCtrl", ["$scope", "$http", function($scope, $http) {


    var newData = [];
    var countriesData = [];



    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }


    $http.get("api/v1/country-stats").then(function(myStats) {

        for (var iter = 0; iter < myStats.data.length; iter++) {
            var country = myStats.data[iter].country
            if (!contains(countriesData, country)) {
                countriesData.push(country);
            }
        }
        console.log("len: " + countriesData.length)

        function getCountryData(country) {
            var obj = {};
            var items;
            var itemsCountry = 0;
            $http.get("https://api.discogs.com/database/search?q={?country==" + country + " }&token=zwxZExVZTenjPTKumVeTDVRuniqhQLAxymdzSxUQ").then(function(response) {

                items = response.data.pagination.items;
                var str = "";

                obj['name'] = country;
                for (var J = 0; J < myStats.data.length; J++) {

                    if (myStats.data[J].country == country) {
                        itemsCountry++;
                        str += myStats.data[J].title + ", ";
                    }
                }
                var str2 = str.substring(0, str.length - 2);
                obj['z'] = itemsCountry;
                obj['y'] = items;
                obj['rank'] = str2;

                newData.push(obj);
                console.log("new obj : (" + obj.name + ", " + obj.z + ", " + obj.y + ", " + obj.rank + ")");
                if (newData.length == countriesData.length) {
                    console.log("ehhh");
                    Highcharts.chart('container', {
                        chart: {
                            type: 'variablepie'
                        },
                        title: {
                            text: 'Correlation of items stored in Discogs API and Country-stats API + ranking albums (per country)'
                        },
                        tooltip: {
                            headerFormat: '',
                            pointFormat: '<span style="color:{point.color}">●</span> <b> {point.name}</b><br/>' +
                                'Ranking albums: <b>{point.rank}</b><br/>' +
                                'Items in Discogs db: <b>{point.y}</b><br/>' +
                                'Items in Country-stats db: <b>{point.z}</b><br/>'
                        },
                        series: [{
                            minPointSize: 10,
                            innerSize: '20%',
                            zMin: 0,
                            name: 'countries',
                            data: newData
                        }]
                    });
                }
            });
        }

        for (var iter = 0; iter < countriesData.length; iter++) {
            var countryNew = countriesData[iter];
            getCountryData(countryNew);

        }






        $http.get("https://api.discogs.com/database/search?q={?artist==drake}&token=zwxZExVZTenjPTKumVeTDVRuniqhQLAxymdzSxUQ").then(function(response) {

            console.log("Discogs has " + response.data.pagination.items + " items in the database related to the artist.")
            console.log("hey")

        })

    })








}])
