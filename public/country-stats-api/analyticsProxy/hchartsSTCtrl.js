/*global angular Highcharts */
/*global google*/
angular.module("MusicApp").controller("hchartsSTCtrl", ["$scope", "$http", function($scope, $http) {


    $http.get("api/v1/country-stats").then(function(best) {
        $http.get("proxyST/api/v2/students-an").then(function(response) {

            var newData = [];

            var datosMaria = response.data;
            for(var iter = 0; iter< datosMaria.length; iter++){
                var obj = [];
                var dato = datosMaria[iter];
                var albumAno = "";
                albumAno = (best.data.filter(d => d.year == dato.year).map(py => { console.log(py.title); return py.title })[0]);
                console.log("album: " + albumAno);
                if (albumAno == null) { albumAno = "no ranking album" }
                obj.push(dato.province);
                obj.push(dato.gender);
                obj.push(dato.year);
                var popuni = dato.popinuniversity
                obj.push( popuni);
                obj.push(albumAno);
                newData.push(obj);
                console.log("new obj : " + obj);
                
            }


            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);
            function drawTable() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Province');
                data.addColumn('string', 'Gender');
                data.addColumn('number', 'Year');
                data.addColumn('number', 'popinuniversity');
                data.addColumn('string', 'Album released');
                data.addRows(newData);

                var table = new google.visualization.Table(document.getElementById('table_div'));

                table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
            }



        })

    })

}])
