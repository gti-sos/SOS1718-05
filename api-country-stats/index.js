///////API MANU

//////GET TOTAL FUNCIONA
//////GET INDIVIDUAL FUNCIONA
//////DELETE TOTAL FUNCIONA
//////DELETE INDIVIDUAL FUNCIONA
//////POST TOTAL FUNCIONA (crea recurso)
//////PUT TOTAL FUNCIONA (devuelve error)
//////PUT INDIVIDUAL FUNCONA (actualiza recurso)
//////POST INFIVIDUAL FUNCIONA (devuelve error)

var countryApi = {};
var API_BASE_PATH = "/api/v1/";

module.exports = countryApi;

////////////RECURSOS INICIALES//////////////

var initialdata= [
        { 
            "country" : "Germany",
            "year" : "2002" ,
            "title" : "Mensch",
            "certification" : "21xGold",
            "rank" : "1"
            
        },
        { 
            "country" : "France",
            "year" : "1982" ,
            "title" : "Thriller",
            "certification" : "Diamond",
            "rank" : "2"
        },
        { 
            "country" : "Germany",
            "year" : "1989" ,
            "title" : "...But Seriously",
            "certification" : "6xPlatinum",
            "rank" : "2"
        },
        { 
            "country" : "France",
            "year" : "1995" ,
            "title" : "D'eux",
            "certification" : "Diamond",
            "rank" : "1"
        },
        { 
            "country" : "Canada",
            "year" : "1982" ,
            "title" : "Thriller",
            "certification" : "2xDiamond",
            "rank" : "1"
        }
    ];
    
module.exports = countryApi;

countryApi.register = function(app,dbmanu){
    console.log("Resgistering roots for country-stats api");
    
//////////////////LOAD INITIAL DATA///////////////////////////////
    
    app.get(API_BASE_PATH+"country-stats/loadInitialData",(req,res)=>{
        console.log(Date() + " - GET /country-stats/loadInitialData");
    
        dbmanu.find({}).toArray((err, records)=> {
        if (err) {
            console.error("Error accesing DB");
            process.exit(0);
            }
        if (records.length == 0){
            dbmanu.insert(initialdata);
            console.log("DB initialized with "+ initialdata.length+ "contacts");
            
            
        }
    res.send(initialdata);
    });

    
    });
    
    
    
////////////////////GET RECURSO PRINCIPAL////////////////////
    app.get(API_BASE_PATH+"country-stats",(req,res)=>{
        console.log(Date() + " - GET /country-stats");
        dbmanu.find({}).toArray((err,records)=>{
            if(err){
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
        res.send(records.map((r)=>{
            delete r._id;
            return r;
        }));
            
        });
        
    });
    
//////////////////OPERACIONES CONJUNTO DATOS///////////////////

////POST TOTAL, CREA UN RECURSO NUEVO
    app.post(API_BASE_PATH+"country-stats",(req,res)=>{
        console.log(Date() + " - POST /country-stats");
        var contact = req.body;
        
        dbmanu.insert(contact);
        contact._id = 333333;
        res.sendStatus(200);
    });
    
////PUT TOTAL, DA ERROR    
    app.put(API_BASE_PATH+"country-stats",(req,res)=>{
        console.log(Date() + " - PUT /country-stats");
        res.sendStatus(405);
    });
    
////DELETE TOTAL, BORRA TODOS LOS RECURSOS    
    app.delete(API_BASE_PATH+"country-stats",(req,res)=>{
        console.log(Date() + " - DELETE /country-stats");
        dbmanu.remove({},{multi: true});
        res.sendStatus(200);
    });

///////////////OPERACIONES UN SOLO RECURSO/////////////////

////GET INDIVIDUAL, DEVUELVE TODOS LOS DATOS RECOGIDOS PARA UN PAÍS    
    app.get(API_BASE_PATH+"country-stats/:name",(req,res)=>{
        var name = req.params.name;
        console.log(Date() + " - GET /country-stats/"+name);
        
        
        dbmanu.find({"country" : name}).toArray((err, contacts)=>{
            if(err){
                console.error("Error accesing DB");
                res.sendStatud(500);
                return;
            }
        res.send(contacts.map((c)=>{
            delete c._id;
            return c;
        }));});
        
    });
    
////DEVUELVE EL ALBUM MÁS VENDIDO PARA UN PAÍS Y UN RANGO    
    app.get(API_BASE_PATH+"country-stats/:name/:rank",(req,res)=>{
        var name = req.params.name;
        var rank = req.params.rank;
        console.log(Date() + " - GET /country-stats/"+name + " rank:"+ rank);
        
        
        dbmanu.find({"country" : name, "rank" : rank }).toArray((err, contacts)=>{
            if(err){
                console.error("Error accesing DB");
                res.sendStatud(500);
                return;
            }
        res.send(contacts.map((c)=>{
            delete c._id;
            return c;
        })[0]);});
        
    });
    
    
////BORRA TODOS LOS DATOS PERTINENTES A UN PAÍS    
    app.delete(API_BASE_PATH+"country-stats/:name",(req,res)=>{
        var name = req.params.name;
        console.log(Date() + " - DELETE /country-stats/"+name);
        
        dbmanu.remove({country: name}, function(err, num) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(num);
        
        });
        
    res.sendStatus(200);
       
    });
    
////BORRA UN ÁLBUM DE UN PAÍS EN UN RANGO    
    app.delete(API_BASE_PATH+"country-stats/:name/:rank",(req,res)=>{
        var name = req.params.name;
        var rank = req.params.rank;
        console.log(Date() + " - DELETE /country-stats/"+name);
        
        dbmanu.remove({"country" : name, "rank" : rank }, function(err, num) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(num);
        
        });
        
    res.sendStatus(200);
       
    });
    
    
////POST INDIVIDUAL, DEVUELVE ERROR    
    app.post(API_BASE_PATH+"country-stats/:name",(req,res)=>{
        var name = req.params.name;
        console.log(Date() + " - POST /country-stats/"+name);
        res.sendStatus(405);
    });
    
////PUT INDIVIDUAL, ACTUALIZA EL ALBUM PARA UN PAÍS Y RANGO ESPECÍFICOS    
    app.put(API_BASE_PATH+"country-stats/:name/:rank",(req,res)=>{
        var name = req.params.name;
        var rank = req.params.rank;
        var contact = req.body;
        
        console.log(Date() + " - PUT /country-stats/"+name+ " rank:"+rank);
        
        if(name != contact.country){
            res.sendStatus(409);
            console.warn(Date() + " - Hacking attempt!");
        }
        if(rank != contact.rank){
            res.sendStatus(409);
            console.warn(Date() + " - Hacking attempt!");
        }
        
        dbmanu.update({"country" : contact.country, "rank": contact.rank}, contact, (err, numUpdated)=>{
            if(err){
                console.error("Error accesing DB");
                res.sendStatud(500);
                return;
            }
            console.log("Updated" + numUpdated);
        });
        
        res.sendStatus(200);
    });


};