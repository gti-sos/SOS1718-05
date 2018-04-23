                                                                        //CONTROLADOR//
//esto permite crear la aplicacion
//objetos de angular: -skope permite acceder al modelo, metiendo datos o leyendo datos. -http hacemos conecciones http,peticiones http con mi backend

/*global angular*/
                                                
angular.module("MusicApp").controller("EditWorldCtrl",["$scope","$http","$routeParams","$location",function($scope,$http,$routeParams,$location){
    var world="/api/v1/world-stats/"+$routeParams.country+"/"+$routeParams.year; //variable con la direccion de mi api
    
    ///La variable put se pone a true para señalar que lo que vamos a hacer es actualizar la base de datos, es decir, hacer un put    
    var put = true;
    
        //a partir del parametro de la url envia una peticion http get y lo mete en scope
        $http.get(world).then(function(response){
                   $scope.UpdatedWorld = response.data; //es el objeto que me llega (un array)
                });
            
        //Se toma cada uno de los parámetros de entrada del recurso nuevo y los añade a un objeto nuevo countryStat, la actualización del primero.            
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
            ///Restricción que da error si hay un parámetro vacío dentro dela nueva variable que creamos
            Object.keys(worldStat).forEach(p =>{
                if(worldStat[p]==""){
                  $scope.status = "Status: El objeto debe contener todos los parametros."    //status 409   
                    put=false;    
                }
            })
            
            //Se hace un put en la base de datos con el nuevo objeto, es decir, editamos la base de datos  
            console.log(put)
               if(put){$http.put(world, worldStat).then(function(response){
                   $scope.status= "Status se ha modificado correctamente ";
                    $location.path("/world-stats");
                
            })
               }
        put=true;  
        worldStat={};    //Se reinicia la variable para futuras llamadas
           
        }    
            
    }]);
    