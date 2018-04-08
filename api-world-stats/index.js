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
    
   
                                        //LoadInitialData----->cuando esta la lista vacia, al llamarle crea los ejemplos de arriba.
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

                            //GET, POST, DELETE, PUT(erroneo) para el caso general//
                            ///////////////////////////////////////////////////////
  
     //Enlace donde se encuentra la colección de postman                
app.get(API_BASE_PATH + "best-sellers-stats/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/3897742/collection/RVu1HqZr");
    });
    
    //GET al recurso inicial.....nos devuelve todos los recursos    
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



    //Post al recurso inicial (crea un recurso concreto)
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
    
    //PUT al recurso inicial (erroneo, no se puede actualizar aqui)
app.put(API_BASE_PATH + "best-sellers-stats", (req, res) => {
    console.log(Date() + " - PUT /best-sellers-stats");
    res.sendStatus(405);
});

    //DELETE al recurso inicial (eliminamos toda la lista)
app.delete(API_BASE_PATH + "best-sellers-stats", (req, res) => {
    console.log(Date() + " - DELETE /best-sellers-stats");
    dbvicen.remove({}, { multi: true });
    res.sendStatus(200);
});

                            //GET, POST (erroneo), DELETE, PUT para un recurso en concreto//
                            ///////////////////////////////////////////////////////

    //GET a un recurso concreto.
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


    //DELETE A UN RECURSO EN CONCRETO
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
    
    //POST A UN RECURSO CONCRETO (ERROR)
app.post(API_BASE_PATH + "best-sellers-stats/:country/:year", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - POST /best-sellers-stats/" + name);
    res.sendStatus(405);
});

    //PUT A UN RECURSO CONCRETO
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

}