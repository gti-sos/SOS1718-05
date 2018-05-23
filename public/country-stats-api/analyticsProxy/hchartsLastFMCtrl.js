/*global angular Highcharts */
/*global google*/

angular.module("MusicApp").controller("hchartsLastFMCtrl", ["$scope", "$http", function($scope, $http) {

    var newData = [];
    var albumsData = [];

    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }


    function randColor() {

        return '#' + (function co(lor) {
            return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) &&
                (lor.length == 6) ? lor : co(lor);
        })('');
    }

    //apikey = fb8d4307d52ba5572784e113f5613afa
    //http://ws.audioscrobbler.com//2.0/?method=album.search&album=mensch&api_key=fb8d4307d52ba5572784e113f5613afa&format=json
    $http.get("api/v1/country-stats").then(function(myStats) {

        for (var iter = 0; iter < myStats.data.length; iter++) {
            var album = myStats.data[iter].title;
            if (!contains(albumsData, album)) {
                albumsData.push(album);
            }
        }
        console.log("album titles: " + albumsData);

        function getAlbumData(title) {
            $http.get("https://ws.audioscrobbler.com//2.0/?method=album.search&album=" + title + "&api_key=fb8d4307d52ba5572784e113f5613afa&format=json").then(function(response) {
                var data = response.data.results.albummatches;
                var parent = {};
                parent['ID'] = title;
                parent['name'] = title;
                parent['color'] = randColor();
                newData.push(parent);
                for (var i = 0; i < 10; i++) {
                    var obj = {};
                    obj['parent'] = title;
                    obj['name'] = data[i].name + " - " + data[i].artist;
                    obj['value'] = 1;
                    newData.push(obj);

                }
                if (newData.length == albumsData.length * 3) {
                    console.log("newnew: " + newData);

                    Highcharts.chart('container', {
                        series: [{
                            type: "treemap",
                            layoutAlgorithm: 'stripes',
                            alternateStartingDirection: true,
                            levels: [{
                                level: 1,
                                layoutAlgorithm: 'sliceAndDice',
                                dataLabels: {
                                    enabled: true,
                                    align: 'left',
                                    verticalAlign: 'top',
                                    style: {
                                        fontSize: '15px',
                                        fontWeight: 'bold'
                                    }
                                }
                            }],
                            data: newData
                        }],
                        title: {
                            text: 'Fruit consumption'
                        }
                    });

                }
            });
        }


        for (var iter = 0; iter < albumsData.length; iter++) {
            var albumNew = albumsData[iter];
            getAlbumData(albumNew);

        }




    });

    $http.get("https://ws.audioscrobbler.com//2.0/?method=album.search&album=cher&api_key=fb8d4307d52ba5572784e113f5613afa&format=json").then(function(response) {
        console.log(response.data.results.albummatches);


    });


    console.log(randColor());






}])
