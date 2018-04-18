/*global angular*/
angular.module("MusicApp").controller("EditBestCtrl",["$scope","$http","$routeParams","$location",function($scope,$http,$routeParams,$location){
    var best="/api/v1/best-stats/"+$routeParams.country+"/"+$routeParams.year;
    var put = true;
        $http.get(best).then(function(response){
                   $scope.UpdatedBest = response.data; 
                });
            
            
        $scope.UpdateBest = function(){    
            var bestStat = {};
            Object.keys($scope.UpdatedBest).forEach(p =>{
            
                try{
                    bestStat[p] = JSON.parse($scope.UpdatedBest[p]);
                }catch(e){
                    bestStat[p] = $scope.UpdatedBest[p];
                }
            });
            
            console.log(bestStat);
            Object.keys(bestStat).forEach(p =>{
                if(bestStat[p]==""){
                  $scope.status = "Status 400. El objeto debe contener todos los parametros."       
                    put=false;    
                }
            })
            console.log(put)
               if(put){$http.put(best, bestStat).then(function(response){
                   $scope.status= "Status "+response.status;
                    $location.path("/best-stats");
                
            })
               }
        put=true;  
        bestStat={};    
           
        }    
            
    }]);
    
        
    
  