//CONTROLADOR
//objetos de angular: -skope permite acceder al modelo, metiendo datos o leyendo datos. -http hacemos conecciones http,peticiones http con mi backend
//variable con la direccion de mi api
//a partir del parametro de la url envia una peticion http get y lo mete en scope
//es el objeto que me llega (un array)

/*global angular*/
angular.module("MusicApp").controller("ListWorldCtrl",["$scope","$http",function($scope,$http){
    var worldStats="/api/v1/best-sellers-stats";
    var limit=2;
    var offset=0;
    
     
     $scope.seguro = function(apikey){
         $scope.status = "";
         if(apikey=="SOS1718-05"){
             $http.get("/api/v1/secure/best.sellers-stats?apikey="+apikey).then(function(response){
                 $scope.worldStats=response.data;
                 console.log(response.data);
             })
         }else{
             $scope.status = "Status 401. Contraseña incorrecta."
         }
        
         
     }
     
     
     $scope.Busqueda = function(from,to){
        $http.get(worldStats+"?from="+JSON.parse(from)+"&to="+JSON.parse(to)).then(function(response){
            $scope.worldStats=response.data;
        })
    }
    
    
    $scope.deleteAll = function(){    
            
            $http.delete(worldStats).then(function(response){
                   
                   $scope.status = "Status "+response.status;
                   $scope.get();
                
            });
              
            }
    
    $scope.deleteWorld = function(country,year){    
            
            $http.delete(worldStats+"/"+country+"/"+year.toString()).then(function(response){
                   $scope.status = "Status "+response.status;
                    $scope.get();
            });
               
            }
    ////////////////////////////////////////////////////////////////////////////////////////////////POST
    $scope.addWorld = function(){    
        var world = {};
        Object.keys($scope.newWorld).forEach(p =>{
            
                try{
                    world[p] = JSON.parse($scope.newWorld[p]);
                }catch(e){
                    world[p] = $scope.newWorld[p];
                }
        });
           ($scope.worldStats).forEach(p =>{
                if((p.country==world.country) && (p.year==world.year)){
                    $scope.status = "Status 409. Ya existe un objeto con la misma clave (Pais y año)."     
                }});
             if(Object.keys(world).length == 5){
                $http.post(worldStats, world).then(function(response){
                   
                  $scope.estado= "Status "+response.status;
                    $scope.get();
                })
           }else{
                $scope.status = "Status 400. El objeto debe contener todos los parametros."  
           }
            $scope.newWorld={};    
    }
    //////////////////////////////////////////////////////////////////////////////////////////////GET
    $scope.get = function (){    
            
            $http.get(worldStats+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.worldStats=response.data; 
                });
            }
     ///////////////////////////////////////////////////////////////////////////////////////////////PAGINACION       
    $scope.getSiguiente = function (){    
            offset=offset+2;
            $http.get(worldStats+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.worldStats=response.data; 
                });
            }
            
    $scope.getAnterior = function (){    
            
            if(offset>=2){
            offset=offset-2;
            }
            $http.get(worldStats+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.worldStats=response.data; 
                });
            }
            $scope.get();
           
           
           
    ///////////////////////////////////////////////////////////////////////////////////////////////////////       
            }]);
            
            
   