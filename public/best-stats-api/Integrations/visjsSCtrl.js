/*global angular Morris*/
angular.module("MusicApp").controller("visjsSCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("api/v1/best-stats").then(function(best) {
        $http.get("https://api.tvmaze.com/seasons/1/episodes").then(function(serie) {
        
        var arr =[];
        best.data.forEach(b=>{
           var obj={};
           var uno = 1;
           Object.keys(b).forEach(o=>{
               if(o=="year"){
                   obj["value"]=uno;
                   obj["year"]=(b[o]).toString();
                   
               }
           })
            arr.push(obj);
              
        })
        
        serie.data.forEach(s=>{
            var obj={};
            Object.keys(s).forEach(o=>{
                if(o=="airdate"){
                    obj["year"]=s[o];
                }else if(o=="number"){
                    obj["value"]=s[o];
                }
            })
        arr.push(obj);
        
            
        })
        
        console.log(arr);
        new Morris.Line({
  // ID of the element in which to draw the chart.
  element: 'myfirstchart',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: arr,
  // The name of the data record attribute that contains x-values.
  xkey: 'year',
  // A list of names of data record attributes that contain y-values.
  ykeys: ['value'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['Value']
});
            
        })
    })    
}])