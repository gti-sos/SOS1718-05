var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var MongoClient = require("mongodb").MongoClient;


var port = (process.env.PORT || 1607);
var app = express();

//////////////////////////////////////////////////////////////////////RUTA APIs
var bestStats = require("./api-best-stats");
var world = require("./api-world-stats");

//////////////////////////////////////////////////////////////////////RUTA BASE DE DATOS
var mdbURL = "mongodb://julperrod1:zxcvbnm123@ds129939.mlab.com:29939/sos1718-jpr";

var dbFileManu = __dirname + "/countries.db";
var mdbVURL = "mongodb://vicgarmes:zxcvbnm123@ds155529.mlab.com:55529/sos1718-vgm-sandbox";


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
       

////////////////////////////////////////////////////////////API JULIO       
        var DatabaseBest = mlabs.db("sos1718-jpr");
        var dbBest = DatabaseBest.collection("best-stats");
        
        bestStats.register(app, dbBest);

    app.listen(port, () => {
    console.log("server ready TRUE!"); //Se ejecuta el servidor al aparecer el mensaje.
}).on("error", (e) => {
    console.log("Server NOT READY: " + e);
});

console.log("server ready FALSE!"); //Aqui todavia no se ha ejecutadao.
    
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MongoClient.connect(mdbVURL,{native_parser: true},(err,mlabs)=>{
    
    if(err){
        console.error("Error accesing DB:" +err);
        process.exit(1);
    }
        
////////////////////////////////////////////////////////////API VICENTE
     var DatabaseWorld = mlabs.db("sos1718-vgm-sandbox");
        var dbWorld = DatabaseWorld.collection("best-sellers-start");
        
        world.register(app, dbWorld);
    
    
    
    app.listen(port, () => {
    console.log("server ready TRUE!"); //Se ejecuta el servidor al aparecer el mensaje.
}).on("error", (e) => {
    console.log("Server NOT READY: " + e);
});

console.log("server ready FALSE!"); //Aqui todavia no se ha ejecutadao.
    
});



/////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////CODIGOMANU


var initialdata = [{
        "country": "Germany",
        "year": 2002,
        "title": "Mensch",
        "certification": "21xGold",
        "rank": 1

    },
    {
        "country": "France",
        "year": 1982,
        "title": "Thriller",
        "certification": "Diamond",
        "rank": 2
    }
];

var dbmanu = new DataStore({
    filename: dbFileManu,
    autoload: true,
    corruptAlertThreshold: 1
});

dbmanu.find({}, (err, contacts) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1)
    }
    if (contacts.length == 0) {

        console.log("Empty DB");
    }
    else {
        console.log("DB initialized with " + contacts.length + "contacts")
    }

});

app.get(API_BASE_PATH + "country-stats/loadInitialData", (req, res) => {
    console.log(Date() + " - GET /country-stats/loadInitialData");

    dbmanu.find({}, function(err, records) {
        if (err) {
            console.error("Error accesing DB");
            process.exit(0);
        }
        if (records.length == 0) {
            dbmanu.insert(initialdata);
            console.log("DB initialized with " + initialdata.length + "contacts");

        }
        res.send(initialdata);
    });


});


app.get(API_BASE_PATH + "country-stats", (req, res) => {
    console.log(Date() + " - GET /country-stats");
    dbmanu.find({}, (err, records) => {
        if (err) {
            console.log("Error accesing DB");
            res.sendStatus(500);
        }
        res.send(records);

    });

});


app.post(API_BASE_PATH + "country-stats", (req, res) => {
    console.log(Date() + " - POST /country-stats");
    var contact = req.body;

    dbmanu.insert(contact);
    res.sendStatus(201);
});


app.put(API_BASE_PATH + "country-stats", (req, res) => {
    console.log(Date() + " - PUT /country-stats");
    res.sendStatus(405);
});


app.delete(API_BASE_PATH + "country-stats", (req, res) => {
    console.log(Date() + " - DELETE /country-stats");
    dbmanu.remove({}, { multi: true });
    res.sendStatus(200);
});


app.get(API_BASE_PATH + "country-stats/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - GET /country-stats/" + name);


    dbmanu.find({}, (err, contacts) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatud(500);
            return;
        }
        res.send(contacts.filter((c) => {
            return (c.country == name);
        })[0]);
    });

});




app.delete(API_BASE_PATH + "country-stats/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - DELETE /country-stats/" + name);

    dbmanu.remove({ country: name }, function(err, num) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(num);

    });

    res.sendStatus(200);

});

app.post(API_BASE_PATH + "country-stats/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - POST /country-stats/" + name);
    res.sendStatus(405);
});

app.put(API_BASE_PATH + "country-stats/:name", (req, res) => {
    var name = req.params.name;
    var contact = req.body;

    console.log(Date() + " - PUT /country-stats/" + name);

    if (name != contact.country) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
    }

    dbmanu.update({ "country": contact.country }, contact, (err, numUpdated) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatud(500);
            return;
        }
        console.log("Updated" + numUpdated);
    });

    res.sendStatus(200);
});



