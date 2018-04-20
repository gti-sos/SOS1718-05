                                                                        //CONTROLADOR//
//esto permite crear la aplicacion
//objetos de angular: -skope permite acceder al modelo, metiendo datos o leyendo datos. -http hacemos conecciones http,peticiones http con mi backend

/*global angular*/
                                                
angular.module("MusicApp").controller("EditWorldCtrl",["$scope","$http","$routeParams","$location",function($scope,$http,$routeParams,$location){
    var world="/api/v1/best-stats/"+$routeParams.country+"/"+$routeParams.year; //variable con la direccion de mi api
    var put = true;
    
        //a partir del parametro de la url envia una peticion http get y lo mete en scope
        $http.get(world).then(function(response){
                   $scope.UpdatedWorld = response.data; //es el objeto que me llega (un array)
                });
            
            
        $scope.UpdateWorld = function(){    
            var worldStat = {};
            Object.keys($scope.UpdatedWorld).forEach(p =>{
            
                try{
                    worldStat[p] = JSON.parse($scope.UpdatedWorld[p]);
                }catch(e){
                    worldStat[p] = $scope.UpdatedWorld[p];
                }
            });
            
            console.log(worldStat);
            Object.keys(worldStat).forEach(p =>{
                if(worldStat[p]==""){
                  $scope.status = "Status 400. El objeto debe contener todos los parametros."       
                    put=false;    
                }
            })
            console.log(put)
               if(put){$http.put(world, worldStat).then(function(response){
                   $scope.status= "Status "+response.status;
                    $location.path("/best-sellers-stats");
                
            })
               }
        put=true;  
        worldStat={};    
           
        }    
            
    }]);
    