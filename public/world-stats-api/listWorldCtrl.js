//CONTROLADOR
//a partir del parametro de la url envia una peticion http get y lo mete en scope
//es el objeto que me llega (un array)

/*global angular*/
//objetos de angular: -skope permite acceder al modelo, metiendo datos o leyendo datos. -http hacemos conecciones http,peticiones http con mi backend
angular.module("MusicApp").controller("ListWorldCtrl",["$scope","$http",function($scope,$http){
    var worldStats="/api/v1/world-stats"; //variable con la direccion de mi api
    var limit=10; //la cantidad que cojo
    var offset=0; //donde empiezo
    
    var datax = [];
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     $http.get("/api/v1/world-stats")
        .then(function(response) {
            //
  
        response.data.forEach(v => {
            var vic= {};
            Object.keys(v).forEach(o => {
                console.log(v["sale"]);
               
                if (o == "sale") {
                    vic["y"] = v[o];
                   
            }else if(o == "album"){
                vic["name"] = v[o]
            }
            })
        datax.push(vic);
            
        });
        
        Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: datax
    }]
});

     ///////
            
        });
    ///////////
    
     $scope.seguro = function(apikey){
         $scope.status = "";
         if(apikey=="SOS1718-05"){
             $http.get("/api/v1/secure/world-stats?apikey="+apikey).then(function(response){
                 $scope.worldStats=response.data;
                 console.log(response.data);
             })
         }else{
             $scope.status = "Status: Contraseña incorrecta."; //Status 401
         }
        
         
     }
     
     
   
    $scope.Busqueda = function(from,to){
        $http.get(worldStats+"?from="+JSON.parse(from)+"&to="+JSON.parse(to)).then(function(response){
            $scope.worldStats=response.data;
        })
    }
    
    $scope.deleteAll = function(){    
            
            $http.delete(worldStats).then(function(response){
                   
                   $scope.status = "Status: Eliminado todos los recursos correctamente"; //response.status
                   $scope.get();
                
            });
              
            }
    
    $scope.deleteWorld = function(country,year){    
            
            $http.delete(worldStats+"/"+country+"/"+year.toString()).then(function(response){
                   $scope.status = "Status: Eliminado el recurso correctamente.";
                    $scope.get();
            });
               
            }
            //
    //Añadir un recurso
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
                    $scope.status = "Status: Ya existe un objeto con la misma clave (Pais y año)." //status 409
                }});
             if(Object.keys(world).length == 5){
                $http.post(worldStats, world).then(function(response){
                   
                  $scope.status= "Status: Añadido un nuevo recurso correctamente ";
                    $scope.get();
                })
           }else{
                $scope.status = "Status: El objeto debe contener todos los parametros."  // status 400 
           }
            $scope.newWorld={};    
    }
    //funcion que muestra el contenido de la api
    //scope.get nos permite leer los datos  
    $scope.get = function (){    
            
            $http.get(worldStats+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.worldStats=response.data; 
            }, function errorVacio(response) {
             console.log("Empty");
                $scope.worldStats = [];
                });
            }
    //funcion que mustra la api al completo
     $scope.getCompleto = function (){    
            
            $http.get(worldStats).then(function(response){
                   $scope.worldStats=response.data; 
                });
            }
   //función para avanzar de página:
    $scope.getSiguiente = function (){    
            offset=offset+10;
              //a partir del parametro de la url envia una peticion http get y lo mete en scope
            $http.get(worldStats+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.worldStats=response.data;  //es el objeto que me llega (un array)
                });
            }
    
    //funcion para volver a pag anterior:  
    $scope.getAnterior = function (){    
            //
            if(offset>=10){//si el punto de partida no es 0, y es mayor que 3, significa que no esta en la primera página
            offset=offset-10; // asique disminuimos el offset en -3, para acceder a la página anterior.
            }
            //a partir del parametro de la url envia una peticion http get y lo mete en scope
            $http.get(worldStats+"?limit="+limit+"&offset="+offset).then(function(response){
                   $scope.worldStats=response.data; //es el objeto que me llega (un array)
                });
            }
            $scope.get();
            
            
            
             //LOAD INITIAL DATA
    //
    $scope.loadInitialData = function(){
        $http.get("/api/v1/world-stats/loadInitialData").then(function(response){
                   
                   $scope.status = "Status: Se han creado todos los recursos iniciales.";
                   $scope.get();
                
            });
    }
            }]);
            
            
   