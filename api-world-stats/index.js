var world = {};
var API_BASE_PATH = "/api/v1/";

var initialdato = [{
        "country":"US",
        "year":1982,
        "album":"Thriller",
        "artist":"Michael Jackson",
        "sale":"65 millons"

    },
    {
        "country":"Australia",
        "year":1980,
        "album":"Back in Black",
        "artist":"AC/DC",
        "sale":"50 millions"
    },
    {
        "country": "UK",
        "year": 1973,
        "album": "The Dark Side of the Moon",
        "artist": "Pink Floyd",
        "sale": "45 millions"
    },
    {
        "country": "US",
        "year": 1992,
        "album": "The Bodyguard",
        "artist": "Whitney Houston",
        "sale": "45 millions"
    },
    {
        "country": "US",
        "year": 1976,
        "album": "Their Greatests Hits",
        "artist": "Eagles",
        "sale": "42 millions"
    },
    
];

module.exports = world;

world.register= function (app,dbvicen){
    
    console.log("register..");
    
    app.get(API_BASE_PATH + "best-sellers-stats/loadInitialData", (req, res) => {
    console.log(Date() + " - GET /best-sellers-stats/loadInitialData");

    dbvicen.find({}).toArray(function(err, records) {
        if (err) {
            console.error("Error accesing DB");
            process.exit(500);
        }
        if (records.length == 0) {
            dbvicen.insert(initialdato);
            console.log("DB initialized with " + initialdato.length + "contacts");

        }
        res.send(initialdato);
    });


});
////dd


////////////////////////////////////////////////////////////////get grupal
app.get(API_BASE_PATH + "best-sellers-stats", (req, res) => {
    console.log(Date() + " - GET /best-sellers-stats");


    dbvicen.find({}).toArray(function(err, records) {
        if (err) {
            console.error("Error accesing DB");
            process.exit(500);
        }
        res.send(records.map((c) => {
            delete c._id;
            return c;
        }));
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


    dbvicen.find({}).toArray( (err, contacts) => {
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
//////////////////////////////////////////////////////////////////////////////////////

  
app.put(API_BASE_PATH + "best-sellers-stats/:name", (req, res) => {
    var name = req.params.name;
    var contact = req.body;

    console.log(Date() + " - PUT /best-sellers-stats" + name);

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


}