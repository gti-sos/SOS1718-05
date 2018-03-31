////////////////////////////////////////////////////////////vicente
var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var test = require("./test.js");
test();

var port = (process.env.PORT || 1607);
var app = express();

var dbFileVicen = __dirname+"/world.db";




var API_BASE_PATH = "/api/v1/";
var initialdato= [
        { 
            "country" : "US",
            "year" : 1982 ,
            "album" : "Thriller",
            "artist" : "Michael Jackson",
            "sale" : "50 millons"
            
        },
        { 
            "country" : "Australia",
            "year" : 1980 ,
            "album" : "Back in Black",
            "artist" : "AC/DC",
            "sale" : "45 millions"
        }
    ];
    
var dbvicen = new DataStore({
    filename : dbFileVicen,
    autoload: true,
    corruptAlertThreshold: 1
});

dbvicen.find({},(err, contacts)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1)
    }
    if(contacts.length == 0){
        
        console.log();
    }else{
        console.log("DB initialized with "+contacts.length+ "contacts")
    }
    
});

app.get(API_BASE_PATH+"best-sellers-stats/loadInitialData",(req,res)=>{
    console.log(Date() + " - GET /best-sellers-stats/loadInitialData");
    
    dbvicen.find({}, function(err, records) {
    if (err) {
        console.error("Error accesing DB");
        process.exit(0);
        }
    if (records.length == 0){
        dbvicen.insert(initialdato);
        console.log("DB initialized with "+ initialdato.length+ "contacts");
        
    }
    res.send(initialdato);
    });

    
});

////////////////////////////////////////////////////////////////get grupal
app.get(API_BASE_PATH+"best-sellers-stats",(req,res)=>{
    console.log(Date() + " - GET /best-sellers-stats");
    

    dbvicen.find({}, function(err, records) {
    if (err) {
        console.error("Error accesing DB");
        process.exit(0);
        }
    res.send(records);
    });

    
});

////////////////////////////////////////////////////////////////post grupal
app.post(API_BASE_PATH+"best-sellers-stats",(req,res)=>{
    console.log(Date() + " - POST /best-sellers-stats");
    var contact = req.body;
    
    dbvicen.insert(contact);
    res.sendStatus(201);
});


app.put(API_BASE_PATH+"best-sellers-stats",(req,res)=>{
    console.log(Date() + " - PUT /best-sellers-stats");
    res.sendStatus(405);
});


app.delete(API_BASE_PATH+"best-sellers-stats",(req,res)=>{
    console.log(Date() + " - DELETE /best-sellers-stats");
    dbvicen.remove({},{multi: true});
    res.sendStatus(200);
});


app.get(API_BASE_PATH+"best-sellers-stats/:name",(req,res)=>{
    var name = req.params.name;
    console.log(Date() + " - GET /best-sellers-stats/"+name);
    
    
    dbvicen.find({},(err, contacts)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatud(500);
            return;
        }
    res.send(contacts.filter((c)=>{
        return (c.album == name);
    })[0]);});
    
});




app.delete(API_BASE_PATH+"best-sellers-stats/:name",(req,res)=>{
    var name = req.params.name;
    console.log(Date() + " - DELETE /best-sellers-stats/"+name);
    
    dbvicen.remove({album: name}, function(err, num) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(num);
    
    });
    
res.sendStatus(200);
   
});

app.post(API_BASE_PATH+"best-sellers-stats/:name",(req,res)=>{
    var name = req.params.name;
    console.log(Date() + " - POST /best-sellers-stats/"+name);
    res.sendStatus(405);
});

app.put(API_BASE_PATH+"best-sellers-stats/:name",(req,res)=>{
    var name = req.params.name;
    var contact = req.body;
    
    console.log(Date() + " - PUT /best-sellers-stats/"+name);
    
    if(name != contact.album){
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
    }
    
    dbvicen.update({"album" : contact.album}, contact, (err, numUpdated)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatud(500);
            return;
        }
        console.log("Updated" + numUpdated);
    });
    
    res.sendStatus(200);
});


//////////////////////////////////////////////////////////////////////


app.listen(port,()=>{
    console.log("server ready TRUE!");//Se ejecuta el servidor al aparecer el mensaje.
}).on("error",(e)=>{
    console.log("Server NOT READY: "+e);
});

console.log("server ready FALSE!");//Aqui todavia no se ha ejecutadao.