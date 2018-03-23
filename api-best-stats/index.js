var bestStats = {};
var API_BASE_PATH = "/api/v1/";
var initialBests = [
    
        {
        "country":"Spain",
        "year":2017,
        "selling-album":"Prometo - Pablo Alboran",
        "radio-play":"Shape Of You - Ed Sheeran",
        "selling-song":"Despacito - Luis Fonsi & Daddy Yankee",
        
            
        },
        {
           "country":"Spain",
        "year":2016  ,
        "selling-album":"Bailar el viento - Manuel Carrasco",
        "radio-play":"Cheap Thrills - Sia & Sean Paul",
        "selling-song":"Duele el corazón - Enrique Iglesias & Wisin",
        }
    
    
    ];
    
    

module.exports = bestStats;

bestStats.register = function(app,db) {

    app.get(API_BASE_PATH + "best-stats/loadInitialData", (req, res) => {
        console.log(Date() + " - new GET /best");
        db.find({}, (err, bests) => {
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
        db.find({}, (err, bests) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            res.send(bests);

        });

    });
    //////////////////////////////////////

    /////////////////
    app.post(API_BASE_PATH + "best-stats", (req, res) => {
        console.log(Date() + " - new POST /best");
        var aux = req.body;
        db.insert(aux);
        res.sendStatus(201);

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

    app.get(API_BASE_PATH + "best-stats/:year", (req, res) => {
        console.log(Date() + " - new GET /best");
        var anyo = req.params.year;




        db.find({ "year": parseInt(anyo, 0) }, (err, bests) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            res.send(bests);

        });
    });

    app.delete(API_BASE_PATH + "best-stats/:year", (req, res) => {
        console.log(Date() + " - new DELETE /best");
        var anyo = req.params.year;
        db.remove({ "year": parseInt(anyo, 0) });

        res.sendStatus(200);
    });

    app.post(API_BASE_PATH + "best-stats/:year", (req, res) => {
        console.log(Date() + " - new POST /best");


        res.sendStatus(405);
    });


    app.put(API_BASE_PATH + "best-stats/:year", (req, res) => {
        console.log(Date() + " - new PUT /best");
        var year = req.params.year;
        var best = req.body;

        if (year != best.year) {
            res.sendStatus(409);
        }

        db.update({ "year": best.year }, best, (err, numUpdate) => {
            console.log("Updated" + numUpdate);
        })
        res.sendStatus(200);

    });
}
