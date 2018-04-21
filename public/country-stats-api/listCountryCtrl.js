/*global angular*/
angular.module("MusicApp").controller("ListCountryCtrl",["$scope","$http",function($scope,$http){
    var countryStats="/api/v1/country-stats";
    var limit=2;
    var offset=0;
    
     
     $scope.seguro = function(apikey){
         $scope.status = "";
         if(apikey=="SOS1718-05"){
             $http.get("/api/v1/secure/country-stats?apikey="+apikey).then(function(response){
                 $scope.countryStats=response.data;
                 console.log(response.data);
             })
         }else{
             $scope.status = "Status 401. Contraseña incorrecta."
         }
        
         
     }
     
     
     $scope.Busqueda = function(from,to){
        $http.get(countryStats+"?from="+JSON.parse(from)+"&to="+JSON.parse(to)).then(function(response){
            $scope.countryStats=response.data;
        })
    }
    
    
    $scope.deleteAll = function(){    
            
            $http.delete(countryStats).then(function(response){
                   
                   $scope.status = "Status "+response.status;
                   $scope.get();
                
            });
            $scope.get(); 
              
            }
    
    $scope.deleteRankInCountry = function(country,rank){    
            
            $http.delete(countryStats+"/"+country+"/"+rank).then(function(response){
                   $scope.status = "Status "+response.status;
                    $scope.get();
            });
               
            }
            
    $scope.deleteCountry = function(country){    
            
            $http.delete(countryStats+"/"+country).then(function(response){
                   $scope.status = "Status "+response.status;
                    $scope.get();
            });
               
            }        
    ////////////////////////////////////////////////////////////////////////////////////////////////POST
    $scope.addCountry = function(){    
        var newAlbum = {};
        Object.keys($scope.newCountry).forEach(p =>{
            
                try{
                    newAlbum[p] = JSON.parse($scope.newCountry[p]);
                }catch(e){
                    newAlbum[p] = $scope.newCountry[p];
                }
        });
           ($scope.countryStats).forEach(p =>{
                if((p.country==newAlbum.country) && (p.rank==newAlbum.rank)){
                    $scope.status = "Status 409. Ya existe un objeto con la misma clave (Pais y año)."     
                }});
             if(Object.keys(newAlbum).length == 5){
                $http.post(countryStats, newAlbum).then(function(response){
                   
                  $scope.estado= "Status "+response.status;
                    $scope.get();
                })
           }else{
                $scope.status = "Status 400. El objeto debe contener todos los parametros."  
           }
            $scope.newAlbum={};    
    }
    
    //////////////////////////////////////////LOAD INITIAL DATA
    
    $scope.loadInitialData = function(){
        $http.get("/api/v1/country-stats/loadInitialdata").then(function(response){
                   
                   $scope.status = "Status "+response.status;
                   $scope.get();
                
            });
    }
    
    
    //////////////////////////////////////////////////////////////////////////////////////////////GET
    $scope.get = function (){    
            
            $http.get(countryStats+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.countryStats=response.data; 
                });
            }
            
            
            
    $scope.getCompleto = function (){    
            console.log("mostrar api completa")
            $http.get(countryStats).then(function(response){
                   $scope.countryStats=response.data; 
                });
            }
     ///////////////////////////////////////////////////////////////////////////////////////////////PAGINACION       
    $scope.getSiguiente = function (){    
            offset=offset+2;
            $http.get(countryStats+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.countryStats=response.data; 
                });
            }
            
    $scope.getAnterior = function (){    
            
            if(offset>=2){
            offset=offset-2;
            }
            $http.get(countryStats+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.countryStats=response.data; 
                });
            }
            $scope.get();
           
           
           
    ///////////////////////////////////////////////////////////////////////////////////////////////////////       
            }]);
            
            
   