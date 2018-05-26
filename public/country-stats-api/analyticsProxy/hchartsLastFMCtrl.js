/*global angular Highcharts */
/*global google*/

angular.module("MusicApp").controller("hchartsLastFMCtrl", ["$scope", "$http", function($scope, $http) {


    var newData = [];
    var init = ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'];
    var title = ['Albums', null, 0, 0];
    newData.push(init);
    newData.push(title);

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
                if (data == [] || data == null || data.length == 0 || data.length == 1 || data.length == 2) { console.log("REEEEEEEEEEE") }
                else {

                    var parent = [];
                    parent.push(title ) //name
                    parent.push("Albums") //parent
                    parent.push(iterInt) //parent
                    parent.push(iterInt - 2) //parent
                    newData.push(parent);
                    console.log("new parent: " + parent)
                    for (var i = 0; i < 3; i++) {
                        var obj = [];
                        obj.push(data[i].artist + "(" + data[i].name + ")") //name
                        obj.push(title) //parent
                        obj.push(iterInt) //parent
                        obj.push(iterInt - 2) //parent
                        newData.push(obj);
                        console.log("new son: " + obj)

                    }
                }
                if (newData.length <= myStats.data.length * 4) {

                    google.charts.load('current', { 'packages': ['treemap'] });
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {
                        var data = google.visualization.arrayToDataTable(newData);

                        var tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

                        tree.draw(data, {
                            minColor: '#f00',
                            midColor: '#ddd',
                            maxColor: '#0d0',
                            headerHeight: 15,
                            fontColor: 'black',
                            showScale: true
                        });

                    }

                }

            });
        }
        var idList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

        for (var iter = 0; iter < myStats.data.length; iter++) {
            var albumNew = myStats.data[iter].name;
            var rankNew = 10 - myStats.data[iter].y;
            var idNew = idList[iter];
            getAlbumData(albumNew, rankNew, idNew);

        }




    });

}])
