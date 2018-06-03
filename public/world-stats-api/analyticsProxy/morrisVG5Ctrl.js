/*global Morris angular Highcharts*/
angular.module("MusicApp").controller("morrisVG5Ctrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/world-stats").then(function(world) {
    
    //MORRIS.JS
     var mashape = {
            method: 'GET',
            url: "https://apicloud-facerect.p.mashape.com/process-url.json?url=http%3A%2F%2Fapicloud.me%2Fassets%2Ffacerect%2Fimage1.jpg",
            headers: {
                "X-Mashape-Key": "iMzh0QJkkqmshRi6MZpCKCym7oSJp1Zw0rfjsn6vshBK8Nsljf",
                "Accept":"application/json" 
            }
        };
    
     $http(mashape).then(function(build1){
        
         var v = build1.data["faces"];
        console.log(v); 
        
    
    var arr = [];    
    world.data.forEach(w =>{
        var obj = {};
        Object.keys(w).forEach(o=>{
            if(o=="album") {
                obj["label"]=(w[o]);
            }else if(o=="sale"){
                obj["value"]=w[o];
            }
            
        })
        arr.push(obj);
        
    })
     ///////
      v.forEach(w =>{
        var obj = {};
        Object.keys(w).forEach(o=>{
            if(o=="orientation") {
                obj["label"]=(w[o]);
            }else if(o=="width"){
                obj["value"]=w[o];
            }
            
        })
        arr.push(obj);
        
    })
     
    ////////
    
    console.log(arr);
    
    new Morris.Donut({
  // ID of the element in which to draw the chart.
  element: 'myfirstchart',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: arr,
  // The name of the data record attribute that contains x-values.
  xkey: 'label',
  // A list of names of data record attributes that contain y-values.
  ykeys: ['value'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['Value'],
  

    });   
        });
     });
}]);