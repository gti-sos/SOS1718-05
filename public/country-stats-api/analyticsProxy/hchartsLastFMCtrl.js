/*global angular Highcharts */
/*global google*/

angular.module("MusicApp").controller("hchartsLastFMCtrl", ["$scope", "$http", function($scope, $http) {
    

    var newData = [];

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
            return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 16)]) &&
                (lor.length == 6) ? lor : co(lor);
        })('');
    }


    //apikey = fb8d4307d52ba5572784e113f5613afa
    //http://ws.audioscrobbler.com//2.0/?method=album.search&album=mensch&api_key=fb8d4307d52ba5572784e113f5613afa&format=json
    
    
    
    $http.get("api/v1/country-stats/analytics").then(function(myStats) {
        console.log(myStats.data)
       

        function getAlbumData(title, iterInt, idNew) {
            $http.get("https://ws.audioscrobbler.com//2.0/?method=album.search&album=" + title + "&api_key=fb8d4307d52ba5572784e113f5613afa&format=json").then(function(response) {
                var data = response.data.results.albummatches.album;
                if (data == [] || data == null || data.length == 0 || data.length == 1|| data.length == 2) { console.log("REEEEEEEEEEE") }
                else {
 
                    var parent = {};
                    parent['ID'] = idNew;
                    parent['name'] = title;
                    parent['color'] = "'" + randColor() + "'";
                    newData.push(parent);
                    console.log("new parent: " + parent.ID + ", " + parent.name + ", " + parent.color)
                    for (var i = 0; i < 1; i++) {
                        var obj = {};
                        obj['parent'] = idNew;
                        obj['name'] = data[i].name + " - " + data[i].artist;
                        obj['value'] =  iterInt;
                        newData.push(obj);
                        console.log("new obj: " + obj.parent + ", " + obj.name + ", " + obj.value)

                    }
                }
                if (newData.length <= myStats.data.length ) {
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
                            text: 'Artist for each ranking album + average ranking'
                        }
                    });

                }
         
            });
        }
        var idList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'];

        for (var iter = 0; iter < myStats.data.length  ; iter++) {
            var albumNew = myStats.data[iter].name;
            var rankNew = myStats.data[iter].y;
            var idNew = idList[iter];
            getAlbumData(albumNew, rankNew, idNew);

        }




    });

}])
