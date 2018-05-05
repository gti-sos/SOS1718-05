/*global angular*/
angular.module("MusicApp").controller("EditCountryCtrl",["$scope","$http","$routeParams","$location",function($scope,$http,$routeParams,$location){
///variable que enlaza al recurso a editar, tomándolo del backEnd (carpeta no pública)
    var country="/api/v1/country-stats/"+$routeParams.country+"/"+$routeParams.rank;
 
///La variable put se pone a true para señalar que lo que vamos a hacer es actualizar la base de datos, es decir, hacer un put    
    var put = true;
        $http.get(country).then(function(response){
                   $scope.UpdatedCountry = response.data; 
                });
            
///Se toma cada uno de los parámetros de entrada del recurso nuevo y los añade a un objeto nuevo countryStat, la actualización del primero.            
        $scope.UpdateCountry = function(){    
            var countryStat = {};
                
            Object.keys($scope.UpdatedCountry).forEach(p =>{
            
                try{
                    countryStat[p] = JSON.parse($scope.UpdatedCountry[p]);
                }catch(e){
                    countryStat[p] = $scope.UpdatedCountry[p];
                }
            });
            console.log(countryStat.country);
            
///Restricción que da error si hay un parámetro vacío dentro dela nueva variable que creamos
            Object.keys(countryStat).forEach(p =>{
                
                if(countryStat[p]==""){
                  $scope.status = "Status 400. Cant update items with blank parameters."       
                    put=false;    
                }
            })
            
///Se hace un put en la base de datos con el nuevo objeto, es decir, editamos la base de datos          
            console.log(put)
               if(put){$http.put(country, countryStat).then(function(response){
                   
                    $location.path("/country-stats");
                    $scope.status= "Status 200. Item ("+ country.country + ", " + country.rank + ") successfully updated.";
                
            })
               }
        put=true;  
        countryStat={};  ///Se reinicia la variable para futuras llamadas   
           
        }    
            
}]);