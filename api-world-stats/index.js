var world = {};
var API_BASE_PATH = "/api/v1/";

var initialdato = [{
        "country": "US",
        "year": 1982,
        "album": "Thriller",
        "artist": "Michael Jackson",
        "sale": "65 millons"

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
            res.sendStatus(201);
            console.log("DB initialized with " + initialdato.length + "contacts");

        }
        res.send(initialdato);
    });


});

////dd
app.get(API_BASE_PATH + "best-sellers-stats/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/3897742/collection/RVu1HqZr");
    });
    
app.get(API_BASE_PATH + "best-sellers-stats", (req, res) => {
        console.log(Date() + " - new GET /best-sellers-stats");
        dbvicen.find({}).toArray((err, records) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            if(records.length == 0){
                res.sendStatus(404);
            }else{
            res.send(records.map(b => {delete b._id;
            return b;}));
            }
        });


    });
//
////////////////////////////////////////////////////////////////get grupal
/*app.get(API_BASE_PATH + "best-sellers-stats", (req, res) => {
    console.log(Date() + " - GET /best-sellers-stats");


    dbvicen.find({}).toArray(function(err, records) {
        if (err) {
            console.error("Error accesing DB");
            process.exit(500);
        }
        res.send(records);
    });


});
*/
////////////////////////////////////////////////////////////////post grupal
/*app.post(API_BASE_PATH + "best-sellers-stats", (req, res) => {
    console.log(Date() + " - POST /best-sellers-stats");
    var contact = req.body;

    dbvicen.insert(contact);
    res.sendStatus(201);
});
*/
app.post(API_BASE_PATH+"best-sellers-stats",(req,res)=>{
        console.log(Date() + " - POST /best-sellers-stats");
        var contact = req.body;
        
        dbvicen.find({"country": contact.country, "year":contact.year}).toArray((err, records) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
                
            }else if(Object.keys(contact).length != 5){    
                res.sendStatus(400);
            
            }else if (records.length == 0) {
                dbvicen.insert(contact);
                res.sendStatus(201);
                
            }else{
                res.sendStatus(409);
            }

            
        });
        
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

////////////////////////////////////////////////////////////////////////////////////////////// HECHO
app.get(API_BASE_PATH+"best-sellers-stats/:country/:year",(req,res)=>{
        var country = req.params.country;
        var anyo = req.params.year;
        var year = parseInt(anyo,0);
        console.log(Date() + " - GET /best-sellers-stats/"+country + " rank:"+ anyo);
        
        
        dbvicen.find({"country" : country, "year" : year }).toArray((err, contacts)=>{
            if(err){
                console.error("Error accesing DB");
                res.sendStatud(500);
                return;
            
            } 
        if(contacts.length == 0){
                res.sendStatus(404);
            
        }
        res.send(contacts.map((c)=>{
            delete c._id;
            return c;
        })[0]);});
        
    });

/*app.get(API_BASE_PATH + "best-sellers-stats/:album/:country", (req, res) => {
    var album = req.params.album;
    var country = req.params.country;
    console.log(Date() + " - GET /best-sellers-stats/" + album);


    dbvicen.find({"album":album, "country":country}).toArray( (err, contacts) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatud(500);
            return;
        }
        if(contacts.length == 0){
                res.sendStatus(404);
            
        }else{
        res.send(contacts.map((c) => {
            delete c._id;
            return c;
        })[0]);
            
        }});

});
*/
/*
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
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////hecho
 app.delete(API_BASE_PATH+"best-sellers-stats/:country/:year",(req,res)=>{
        var country = req.params.country;
        var anyo = req.params.year;
         var year = parseInt(anyo,0);
        console.log(Date() + " - DELETE /country-stats/"+country);
        
        dbvicen.remove({"country" : country, "year" : year }, function(err, num) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(num);
        
        });
        
    res.sendStatus(200);
       
    });
app.post(API_BASE_PATH + "best-sellers-stats/:country/:year", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - POST /best-sellers-stats/" + name);
    res.sendStatus(405);
});
//////////////////////////////////////////////////////////////////////////////////////
 app.put(API_BASE_PATH+"best-sellers-stats/:country/:year",(req,res)=>{
        var country = req.params.country;
        var anyo = req.params.year;
        var year = parseInt(anyo,0);
        var contact = req.body;
        
        
        
        
        if(Object.keys(contact).length != 5){    
            res.sendStatus(400);
            
            }
        
        console.log(Date() + " - PUT /country-stats"+country+ " rank:"+year);
        
        if(country != contact.country){
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
        }
        if(year != contact.year){
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
        }
        if(contact){
            
        }
        
        dbvicen.update({"country" : contact.country, "year": contact.year}, contact, (err, numUpdated)=>{
            if(numUpdated == 0){res.sendStatud(400);}
            else if(err){
                console.error("Error accesing DB");
                res.sendStatud(500);
                return;
            }
            console.log("Updated" + numUpdated);
        });
        
        res.sendStatus(200);
    });
 /*
app.put(API_BASE_PATH + "best-sellers-stats/:name", (req, res) => {
    var name = req.params.name;
    var contact = req.body;

    console.log(Date() + " - PUT /best-sellers-stats" + name);

    if (name != contact.album) {
        res.sendStatus(400); //debe contener el mismo id del recurso al que se especifica en la URL
       // console.warn(Date() + " - Hacking attempt!");
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
*/
}