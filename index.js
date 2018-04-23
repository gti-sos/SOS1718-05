var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;


var port = (process.env.PORT || 1607);
var app = express();

 
///
//////////////////////////////////////////////////////////////////////RUTA APIs
var bestStats = require("./api-best-stats");
var world = require("./api-world-stats");
var countryApi = require("./api-country-stats");
//////////////////////////////////////////////////////////////////////RUTA BASE DE DATOS
var mdbURL = "mongodb://julperrod1:zxcvbnm123@ds129939.mlab.com:29939/sos1718-jpr";
///////////////////////////////////////////////////////////////////////

app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/public"));

var API_BASE_PATH = "/api/v1/";


/////////////////////////////////////////////////////////////////////APIS 
MongoClient.connect(mdbURL,{native_parser: true},(err,mlabs)=>{
    
    if(err){
        console.error("Error accesing DB:" +err);
        process.exit(1);
    }
       
        var DatabaseBest = mlabs.db("sos1718-jpr");
        var dbBest = DatabaseBest.collection("best-stats");
        var dbWorld = DatabaseBest.collection("world-stats");
        var dbmanu = DatabaseBest.collection("country-stats");
        
        
        world.register(app, dbWorld);
        bestStats.register(app, dbBest);
        countryApi.register(app, dbmanu);
    
    app.listen(port, () => {
    console.log("server ready TRUE!"); //Se ejecuta el servidor al aparecer el mensaje.
}).on("error", (e) => {
    console.log("Server NOT READY: " + e);
});

console.log("server ready FALSE!"); //Aqui todavia no se ha ejecutadao.
    
});


