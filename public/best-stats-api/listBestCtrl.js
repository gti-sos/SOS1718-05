/*global angular*/
angular.module("MusicApp").controller("ListBestCtrl",["$scope","$http",function($scope,$http){
    var bests="/api/v1/best-stats";
    var limit=2;
    var offset=0;
    
     
     $scope.seguro = function(apikey){
         $scope.status = "";
         if(apikey=="SOS1718-05"){
             $http.get("/api/v1/secure/best-stats?apikey="+apikey).then(function(response){
                 $scope.bests=response.data;
                 console.log(response.data);
             })
         }else{
             $scope.status = "Status 401. Contraseña incorrecta."
         }
        
         
     }
     
     
     $scope.Busqueda = function(from,to){
        $http.get(bests+"?from="+JSON.parse(from)+"&to="+JSON.parse(to)).then(function(response){
            $scope.bests=response.data;
        })
    }
    
    
    $scope.deleteAll = function(){    
            
            $http.delete(bests).then(function(response){
                   
                   $scope.status = "Status "+response.status;
                   $scope.get();
                
            });
              
            }
    
    $scope.deleteBest = function(country,year){    
            
            $http.delete(bests+"/"+country+"/"+year.toString()).then(function(response){
                   $scope.status = "Status "+response.status;
                    $scope.get();
            });
               
            }
    ////////////////////////////////////////////////////////////////////////////////////////////////POST
    $scope.addBest = function(){    
        var best = {};
        Object.keys($scope.newBest).forEach(p =>{
            
                try{
                    best[p] = JSON.parse($scope.newBest[p]);
                }catch(e){
                    best[p] = $scope.newBest[p];
                }
        });
           ($scope.bests).forEach(p =>{
                if((p.country==best.country) && (p.year==best.year)){
                    $scope.status = "Status 409. Ya existe un objeto con la misma clave (Pais y ranking)."     
                }});
             if(Object.keys($scope.newBest).length == 5){
                $http.post(bests, best).then(function(response){
                   
                  $scope.status= "Status "+response.status;
                    $scope.get();
                })
           }else{
                $scope.status = "Status 400. El objeto debe contener todos los parametros."  
           }
            $scope.newBest={};    
    }
    //////////////////////////////////////////////////////////////////////////////////////////////GET
    $scope.get = function (){    
            
            $http.get(bests+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.bests=response.data; 
                });
            }
     ///////////////////////////////////////////////////////////////////////////////////////////////PAGINACION       
    $scope.getSiguiente = function (){    
            offset=offset+2;
            $http.get(bests+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.bests=response.data; 
                });
            }
            
    $scope.getAnterior = function (){    
            
            if(offset>=2){
            offset=offset-2;
            }
            $http.get(bests+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.bests=response.data; 
                });
            }
            $scope.get();
           
           
           
    ///////////////////////////////////////////////////////////////////////////////////////////////////////       
            }]);
            
            
   