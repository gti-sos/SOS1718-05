var bestStats = {};
var API_BASE_PATH = "/api/v1/";
var initialBests = [
    
        {
        "country":"Spain",
        "year":2017,
        "album":"Prometo",
        "radio":"Shape Of You",
        "song":"Despacito"
        
            
        },
        {
           "country":"Spain",
        "year":2016  ,
        "album":"Bailar el viento",
        "radio":"Cheap Thrills",
        "song":"Duele el corazón"
        },
         {
        "country":"Spain",
        "year":2015,
        "album":"Sirope",
        "radio":"Thinking Out Loud",
        "song":"El perdón"
        
            
        },
         {
        "country":"Spain",
        "year":2014,
        "album":"Terral",
        "radio":"Bailando",
        "song":"Happy"
        
            
        },
         {
        "country":"Spain",
        "year":2013,
        "album":"Tanto",
        "radio":"Cero",
        "song":"Locked out of heaven"
        
            
        }
    
    
    ];
    
    

module.exports = bestStats;

bestStats.register = function(app,db) {

////////////////////////////////////////////////////////////////////////AUTENTICACION
    app.get(API_BASE_PATH + "secure/best-stats", (req, res) => {
         console.log(Date() + " - new GET /best");
         var apikey = req.query.apikey;
         if(apikey == "SOS1718-05"){
            db.find({}).toArray((err, bests) => {
                if (err) {
                    console.log("Error accesing DB");
                    res.sendStatus(500);
                }
                if(bests.length == 0){
                    res.sendStatus(404);
                }else{
                    res.send(bests.map(b => {delete b._id;
                    return b;}));
                }
            });
        }else{
            res.sendStatus(401)
        }
    });



//////////////////////////////////////////////////////////////////////LOAD INITIAL DATA
    app.get(API_BASE_PATH + "best-stats/loadInitialData", (req, res) => {
        console.log(Date() + " - new GET /best");
        db.find({}).toArray((err, bests) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            if (bests.length == 0) {
                db.insert(initialBests);
            }

            res.sendStatus(201);
        });

    });
    ////////////////////////////////////////////////////////DOCS
    app.get(API_BASE_PATH + "best-stats/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/3897869/collection/RVu1Gqot");
    });
    /////////////////////////////////////////////////////CONJUNTO DE RECURSOS.
    
    ////////////////////////////////////////////////////////GET GENERAL BUSQUEDA Y PAGINACION
    app.get(API_BASE_PATH + "best-stats", (req, res) => {
        console.log(Date() + " - new GET /best");
        var query = req.query;
        var limit = 0;
        var offset = 0;
        var cota ={};
        var dbq = {};
        console.log("A");//Pruebas
        Object.keys(query).forEach(p =>{
            if(p=="from"){
                cota["$gt"]=JSON.parse(query[p]);
            }else if(p=="to"){
                cota["$lt"]=JSON.parse(query[p]);
               dbq["year"]=cota;
            }
            else if(p =="limit"){
                limit = JSON.parse(query[p]);
            }else if(p == "offset"){
                offset = JSON.parse(query[p]);
            }else{
                try{
                    dbq[p] = JSON.parse(query[p]);
                }catch(e){
                    dbq[p] = query[p];
                }
            }  
            
            
        });
        
        db.find(dbq).skip(offset).limit(limit).toArray((err, bests) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            if(bests.length == 0){
            
                res.sendStatus(404);
                
            }else{
            res.send(bests.map(b => {delete b._id;
            return b;}));
            }
        
            console.log("D");//Pruebas
        });
    console.log("C");//Pruebas
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////
   /* app.post(API_BASE_PATH + "best-stats", (req, res) => {
        console.log(Date() + " - new POST /best");
        var aux = req.body;
        
        console.log("H");//Pruebas
        db.find({"country":aux.country,"year":aux.year}).toArray((err, bests) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            if (bests.length == 0) {
                db.insert(aux);
                res.sendStatus(201);
                
            }else if(Object.keys(aux).length != 5){    
            res.sendStatus(400);
            
            }else{
                res.sendStatus(409);
            }

       //G     
        
            console.log("G");//pruebas
        });
    //F
        console.log("F");//Pruebas
    });*/
    
     app.post(API_BASE_PATH + "/best-stats", (req, res) => {
        console.log(Date() + " - POST /best-an");
        var aux = req.body;
        if (aux.province == null || aux.year == null || aux.gender == null) {
            console.error("Invalid fields");
            res.sendStatus(400);
            return;
        }

        db.find({ "province": aux.province, "year": aux.year, "gender": aux.gender }).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                process.exit(1);
            }

            if (results.length == 0) {
                db.insert(aux);
                console.log("Inserted element");
                res.sendStatus(201);
            }

            else {
                console.log("The resource already exists");
                res.sendStatus(409);

            }
        });

    });
    

    app.put(API_BASE_PATH + "best-stats", (req, res) => {
        console.log(Date() + " - new PUT /best");
        res.sendStatus(405);
    });

    app.delete(API_BASE_PATH + "best-stats", (req, res) => {
        console.log(Date() + " - new DELETE /best");
        db.remove({}, { multi: true });
        res.sendStatus(200);
    });

    ///////////////////////////////////////////////////////UN SOLO RECURSO.    

    app.get(API_BASE_PATH + "best-stats/:country/:year", (req, res) => {
        console.log(Date() + " - new GET /best");
        var country = req.params.country;
        var anyo = req.params.year;
        



        db.find({ "country": country,"year": parseInt(anyo, 0) }).toArray((err, bests) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            if(bests.length == 0){
                res.sendStatus(404);
            }else{
            
            res.send(bests.map(b => {delete b._id;
            return b;})[0]);
            
            
            }
        });
    });

    app.delete(API_BASE_PATH + "best-stats/:country/:year", (req, res) => {
        console.log(Date() + " - new DELETE /best");
        var country = req.params.country;
        var anyo = req.params.year;
        db.remove({ "country":country,"year": parseInt(anyo, 0) });

        res.sendStatus(200);
    });

    app.post(API_BASE_PATH + "best-stats/:country/:year", (req, res) => {
        console.log(Date() + " - new POST /best");


        res.sendStatus(405);
    });


    app.put(API_BASE_PATH + "best-stats/:country/:year", (req, res) => {
        console.log(Date() + " - new PUT /best");
        var country = req.params.country;
        var year = req.params.year;
        var best = req.body;

        if ((year != best.year) || (country != best.country) ) {
            res.sendStatus(400);
        
        }else if(Object.keys(best).length != 5){    
            res.sendStatus(400);
            
        }else{
        

        db.update({"country":best.country,"year": best.year}, best, (err, numUpdate) => {
            console.log("Updated" + numUpdate);
        })
        
        
        res.sendStatus(200);
        }
    });

    
}