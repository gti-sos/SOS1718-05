/*global angular*/
angular.module("MusicApp").controller("ListBestCtrl",["$scope","$http",function($scope,$http){
    var bests="/api/v1/best-stats";
    
    
    $scope.deleteBest = function(country,year){    
            
            $http.delete(bests+"/"+country+"/"+year.toString()).then(function(response){
                   $scope.status = "Status "+response.status;
                    getBest();
            });
                
            }
    
    $scope.addBest = function(){    
        var best = {};
        Object.keys($scope.newBest).forEach(p =>{
            
                try{
                    best[p] = JSON.parse($scope.newBest[p]);
                }catch(e){
                    best[p] = $scope.newBest[p];
                }
        });
            $http.post(bests, best).then(function(response){
                   $scope.status= "Status "+response.status;
                    getBest();
            });
                
            }
    
    function getBest(){    
            $http.get(bests).then(function(response){
                   $scope.bests=response.data; 
                });
            }
            getBest();
            }]);