/*global angular*/
angular.module("MusicApp").controller("EditBestCtrl",["$scope","$http","$routeParams","$location",function($scope,$http,$routeParams,$location){
    var best="/api/v1/best-stats/"+$routeParams.country+"/"+$routeParams.year;
     
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
            $http.put(best, bestStat).then(function(response){
                   $scope.status= "Status "+response.status;
                    $location.path("/best-stats");
                
            })
                
            }    
            
            }]);
    
        
    
  