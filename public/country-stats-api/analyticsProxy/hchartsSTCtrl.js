/*global angular Highcharts */
/*global google*/
angular.module("MusicApp").controller("hchartsSTCtrl", ["$scope", "$http", function($scope, $http) {


    $http.get("api/v1/country-stats").then(function(best) {
        $http.get("proxyST/api/v2/students-an").then(function(response) {

            var newData = [];
            var finalData = [];
            var countriesData = [];
            var countries = [];

            function contains(a, obj) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i] === obj) {
                        return true;
                    }
                }
                return false;
            }



            for (var iter = 0; iter < best.data.length; iter++) {
                var country = best.data[iter].country
                if (!contains(countries, country)) {
                    countries.push(country);
                }
            }

            var datosMaria = response.data;
            for (var iter = 0; iter < datosMaria.length - 5; iter++) {
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
                obj.push(popuni);
                obj.push(albumAno);
                newData.push(obj);

            }
            console.log(newData);


            var init = []
            init.push("Data");
            init.push("");
            init.push("");
            finalData.push(init);

            for (var iter = 0; iter < newData.length; iter++) {
                var item = newData[iter];
                var obj = [];
                if (!contains(countriesData, item[0]) && countriesData.length < 3) {
                    countriesData.push(item[0]);
                    obj.push(item[0]);
                    obj.push("Data");
                    obj.push("");
                    finalData.push(obj);
                }
                if (contains(countriesData, item[0])) {
                    var obj1 = [];
                    obj1.push(item[1] + "(" + item[2] + ")");
                    obj1.push(item[0]);
                    obj1.push("");
                    finalData.push(obj1);

                    var obj2 = [];
                    obj2.push(item[3] + " - " + item[4]);
                    obj2.push(item[1] + "(" + item[2] + ")");
                    obj2.push("");
                    finalData.push(obj2);
                }
            




                if (finalData.length >= newData.length + 2) {
                    console.log("reeeee")
                    google.charts.load('current', { packages: ["orgchart"] });
                    google.charts.setOnLoadCallback(drawChart);

                    ///tipo texto == <font color="red">This is some text!</font>
                    console.log("countriesData" + countriesData.length)

                }


            }

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Name');
                data.addColumn('string', 'Manager');
                data.addColumn('string', 'ToolTip');

                // For each orgchart box, provide the name, manager, and tooltip to show.

                data.addRows(finalData);

                var row = [
                    ['Mike', "", ""],
                    ['Alice', 'Mike', ""],
                    ['Bob', 'Mike', ""],
                    ['Carol', 'Bob', ""]
                ]
                console.log(row)
                // Create the chart.
                var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
                // Draw the chart, setting the allowHtml option to true for the tooltips.
                chart.draw(data, { allowHtml: true });
            }




            console.log(finalData);





        })

    })

}])
