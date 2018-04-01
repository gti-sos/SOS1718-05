var bestStats = {};
var API_BASE_PATH = "/api/v1/";
var initialBests = [
    
        {
        "country":"Spain",
        "year":2017,
        "selling-album":"Prometo - Pablo Alboran",
        "radio-play":"Shape Of You - Ed Sheeran",
        "selling-song":"Despacito - Luis Fonsi & Daddy Yankee"
        
            
        },
        {
           "country":"Spain",
        "year":2016  ,
        "selling-album":"Bailar el viento - Manuel Carrasco",
        "radio-play":"Cheap Thrills - Sia & Sean Paul",
        "selling-song":"Duele el corazón - Enrique Iglesias & Wisin"
        },
         {
        "country":"Spain",
        "year":2015,
        "selling-album":"Sirope - Alejandro Sanz",
        "radio-play":"Thinking Out Loud  - Ed Sheeran",
        "selling-song":"El perdón - Nicky Jam & Enrique Iglesias"
        
            
        },
         {
        "country":"Spain",
        "year":2014,
        "selling-album":"Terral - Pablo Alboran",
        "radio-play":"Bailando - Enriqu Iglesias",
        "selling-song":"Happy - Pharrell Williams"
        
            
        },
         {
        "country":"Spain",
        "year":2013,
        "selling-album":"Tanto - Pablo Alboran",
        "radio-play":"Cero - Dani Martin",
        "selling-song":"Locked out of heaven - Bruno Mars"
        
            
        }
    
    
    ];
    
    

module.exports = bestStats;

bestStats.register = function(app,db) {

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
    ////////////////////////////////////////////////////////
    

    /////////////////////////////////////////////////////CONJUNTO DE RECURSOS.
    app.get(API_BASE_PATH + "best-stats", (req, res) => {
        console.log(Date() + " - new GET /best");
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

    });
    //////////////////////////////////////

    /////////////////
    app.post(API_BASE_PATH + "best-stats", (req, res) => {
        console.log(Date() + " - new POST /best");
        var aux = req.body;
        
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
