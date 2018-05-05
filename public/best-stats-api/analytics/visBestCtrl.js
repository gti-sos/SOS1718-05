 /*global vis angular*/
 angular.module("MusicApp").controller("visBestCtrl", ["$scope", "$http", function($scope, $http) {
     $http.get("api/v1/best-stats").then(function(response) {
         var data = [];
         var cont = 1;
         response.data.forEach(p => {
             var obj = {};
             var s = "";
             var boolean = true;
             obj["id"] = cont;
             Object.keys(p).forEach(o => {

                 if (o=="album") {
                    if(boolean){
                        s = p[o];
                        boolean = false;
                    }else{
                        s = s+", "+p[o];
                    }
                 }
                 else if (o=="song") {
                    if(boolean){
                        s = p[o];
                        boolean = false;
                    }else{
                        s = s+", "+p[o];
                    }
                 }
                 else if (o=="radio") {
                    if(boolean){
                        s = p[o];
                        boolean = false;
                    }else{
                        s = s+", "+p[o];
                    }
                 }else if(o=="year"){
                     var n = p[o].toString();
                     obj["start"]=n;
                     
                 }
                 

             })
             cont = cont + 1;
             obj["content"]= s;
             data.push(obj);
             

         });
         console.log(data);
         var container = document.getElementById('vis');

         // Create a DataSet (allows two way data-binding)
         var items = new vis.DataSet(data);

         // Configuration for the Timeline
         var options = {};

         // Create a Timeline
         var timeline = new vis.Timeline(container, items, options);
     });
 }]);
 