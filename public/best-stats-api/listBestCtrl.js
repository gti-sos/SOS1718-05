/*global angular*/
angular.module("MusicApp").controller("ListBestCtrl",["$scope","$http",function($scope,$http){
    var bests="/api/v1/best-stats";
    var limit=10;
    var offset=0;
    console.log("List Best Controller inicializado.")
      //////////////////////////////////////////////////////////////////////////////////////////////GET
    function get(){    
            
            $http.get(bests+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.bests=response.data;
                   console.log(response.status);
                }, function Error(response){
                    $scope.bests=[];
                });
            }
            
           
     ///////////////////////////////////////////////////////////////////////////////////////////////PAGINACION       
    $scope.getSiguiente = function (){    
            
            $http.get(bests+"?limit="+limit+"&offset="+offset).then(function(response){
                  if((response.data).length==10){
                      offset=offset+10;
                  } 
                $http.get(bests+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.bests=response.data; 
                   
                });
                
            });
            
            }
            
    $scope.getAnterior = function (){    
            
            if(offset>=10){
            offset=offset-10;
            }
            $http.get(bests+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.bests=response.data; 
            });
    }
           
     $scope.seguro = function(apikey){
         $scope.status = "";
         if(apikey=="SOS1718-05"){
             $http.get("/api/v1/secure/best-stats?apikey="+apikey).then(function(response){
                 $scope.bests=response.data;
                 console.log(response.data);
             })
         }else{
             $scope.status = "Error: Contraseña incorrecta."
         }
        
         
     }
     
     
     $scope.Busqueda = function(from,to){
        $http.get(bests+"?from="+JSON.parse(from)+"&to="+JSON.parse(to)).then(function(response){
            $scope.bests=response.data;
        })
    }
    
    
    $scope.deleteAll = function(){    
            
            $http.delete(bests).then(function(response){
                   
                   $scope.status = "Se elimiaron los objetos con exito.";
                   get();
                
            });
    }
    
    $scope.deleteBest = function(country,year){    
            
            $http.delete(bests+"/"+country+"/"+year.toString()).then(function(response){
                   
                   if(($scope.bests).length==1){
                       $scope.status = "Se ha eliminado el objeto con exito.";
                       $scope.getAnterior();
                   }else{
                   
                   $scope.status = "Se ha eliminado el objeto con exito.";
                   get(); 
            }});
              
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
                    $scope.status = "Error: Ya existe un objeto con la misma clave (Pais y año)."     
                }});
             if(Object.keys($scope.newBest).length == 5){
                $http.post(bests, best).then(function(response){
                   
                  $scope.status= "Se ha creado el objeto con exito";
                    get();
                })
           }else{
                $scope.status = "Error: El objeto debe contener todos los parametros."  
           }
            $scope.newBest={};    
    }
   
    $scope.inicializar = function(){
        $http.get(bests+"/loadInitialData").then(function(response){
             get();
             $scope.status = "Se han creado todos los objetos con exito."
        })
    
       
    }       
      get();     
    ///////////////////////////////////////////////////////////////////////////////////////////////////////       
    }]);
            
            
   