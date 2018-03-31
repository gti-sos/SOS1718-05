var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");


var port = (process.env.PORT || 1607);
var app = express();

//////////////////////////////////////////////////////////////////////RUTA APIs
var bestStats = require("./api-best-stats");
//////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////RUTA BASE DE DATOS
var dbFileName = __dirname + "/best.db";
var dbFileManu = __dirname + "/countries.db";
var dbFileVicen = __dirname + "/world.db";
///////////////////////////////////////////////////////////////////////

app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/public"));

var API_BASE_PATH = "/api/v1/";


/////////////////////////////////////////////////////////////////////BASE DE DATOS JULIO
var db = new DataStore({

    filename: dbFileName,
    autoload: true
});

bestStats.register(app, db);
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


/////////////////////////////////////////////////////////////////////////CÓDIGO VICENTE

var initialdato = [{
        "country": "US",
        "year": 1982,
        "album": "Thriller",
        "artist": "Michael Jackson",
        "sale": "50 millons"

    },
    {
        "country": "Australia",
        "year": 1980,
        "album": "Back in Black",
        "artist": "AC/DC",
        "sale": "45 millions"
    }
];

var dbvicen = new DataStore({
    filename: dbFileVicen,
    autoload: true,
    corruptAlertThreshold: 1
});

dbvicen.find({}, (err, contacts) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1)
    }
    if (contacts.length == 0) {

        console.log();
    }
    else {
        console.log("DB initialized with " + contacts.length + "contacts")
    }

});

app.get(API_BASE_PATH + "best-sellers-stats/loadInitialData", (req, res) => {
    console.log(Date() + " - GET /best-sellers-stats/loadInitialData");

    dbvicen.find({}, function(err, records) {
        if (err) {
            console.error("Error accesing DB");
            process.exit(0);
        }
        if (records.length == 0) {
            dbvicen.insert(initialdato);
            console.log("DB initialized with " + initialdato.length + "contacts");

        }
        res.send(initialdato);
    });


});

////////////////////////////////////////////////////////////////get grupal
app.get(API_BASE_PATH + "best-sellers-stats", (req, res) => {
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
app.post(API_BASE_PATH + "best-sellers-stats", (req, res) => {
    console.log(Date() + " - POST /best-sellers-stats");
    var contact = req.body;

    dbvicen.insert(contact);
    res.sendStatus(201);
});


app.put(API_BASE_PATH + "best-sellers-stats", (req, res) => {
    console.log(Date() + " - PUT /best-sellers-stats");
    res.sendStatus(405);
});


app.delete(API_BASE_PATH + "best-sellers-stats", (req, res) => {
    console.log(Date() + " - DELETE /best-sellers-stats");
    dbvicen.remove({}, { multi: true });
    res.sendStatus(200);
});


app.get(API_BASE_PATH + "best-sellers-stats/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - GET /best-sellers-stats/" + name);


    dbvicen.find({}, (err, contacts) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatud(500);
            return;
        }
        res.send(contacts.filter((c) => {
            return (c.album == name);
        })[0]);
    });

});




app.delete(API_BASE_PATH + "best-sellers-stats/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - DELETE /best-sellers-stats/" + name);

    dbvicen.remove({ album: name }, function(err, num) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(num);

    });

    res.sendStatus(200);

});

app.post(API_BASE_PATH + "best-sellers-stats/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - POST /best-sellers-stats/" + name);
    res.sendStatus(405);
});

app.put(API_BASE_PATH + "best-sellers-stats/:name", (req, res) => {
    var name = req.params.name;
    var contact = req.body;

    console.log(Date() + " - PUT /best-sellers-stats/" + name);

    if (name != contact.album) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
    }

    dbvicen.update({ "album": contact.album }, contact, (err, numUpdated) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatud(500);
            return;
        }
        console.log("Updated" + numUpdated);
    });

    res.sendStatus(200);
});


//////////////////////////////////////////////////////////////////////


app.listen(port, () => {
    console.log("server ready TRUE!"); //Se ejecuta el servidor al aparecer el mensaje.
}).on("error", (e) => {
    console.log("Server NOT READY: " + e);
});

console.log("server ready FALSE!"); //Aqui todavia no se ha ejecutadao.
