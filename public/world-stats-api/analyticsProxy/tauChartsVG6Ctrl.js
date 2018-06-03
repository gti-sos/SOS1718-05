/*global tauCharts angular Highcharts*/
angular.module("MusicApp").controller("tauChartsVG6Ctrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/world-stats").then(function(world) {
    
   //TOUCHART
     var mashape = {
            method: 'GET',
            url: "https://devru-instructables.p.mashape.com/list?limit=20&offset=0&sort=recent&type=id",
            headers: {
                "X-Mashape-Key": "iMzh0QJkkqmshRi6MZpCKCym7oSJp1Zw0rfjsn6vshBK8Nsljf",
                "Accept":"application/json" 
            }
        };
    
     $http(mashape).then(function(build1){
        
        var v = build1.data["items"];
        console.log(v);
        //dats    
    
    var arr = [];    
    world.data.forEach(w =>{
        var obj = {};
        Object.keys(w).forEach(o=>{
            if(o=="album") {
                obj["album"]=(w[o]);
                obj["stage"]=(w[o]);
            }else if(o=="sale"){
                obj["sales"]=w[o];
            }
            
        })
        arr.push(obj);
        
    })
     ///////

    v.forEach(w =>{
        var obj = {};
        Object.keys(w).forEach(o=>{
            if(o=="title") {
                obj["album"]=(w[o]);
                obj["stage"]=(w[o]);
            }else if(o=="views"){
                obj["sales"]=w[o];
            }
            
        })
        arr.push(obj);
        
    })
    ////////
  
    console.log(arr);
    
  var chart = new tauCharts.Chart({
    type: 'horizontal-stacked-bar',
    x: 'sales',
    y: 'album',
    color: 'stage',
    size: 'ABS(count)',
    data: arr
            .map(function (row) {
                row['ABS(count)'] = Math.abs(row.count);
                return row;
            })
            .reverse()
});
chart.renderTo('#bar');  
        });
     });
}]);

/*html,body,#bar{
 width:100%;
 height:100%;  
 margin:0;
 padding: 0;
}

#bar > svg{  
 display:block;
}
*/