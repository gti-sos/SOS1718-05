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
var request = require("request");

module.exports = countryApi;



////////////RECURSOS INICIALES//////////////

var initialdata = [{
        "country": "Germany",
        "rank": 1,
        "title": "Mensch",
        "year": 2002,
        "certification": "21xGold"


    },
    {
        "country": "France",
        "rank": 2,
        "title": "Thriller",
        "year": 1982,
        "certification": "Diamond"

    },
    {
        "country": "Germany",
        "rank": 2,
        "title": "...But Seriously",
        "year": 1989,
        "certification": "6xPlatinum"

    },
    {
        "country": "France",
        "rank": 1,
        "title": "D'eux",
        "year": 1995,
        "certification": "Diamond"

    },
    {
        "country": "Canada",
        "rank": 1,
        "title": "Thriller",
        "year": 1982,
        "certification": "2xDiamond"

    },
    {
        "country": "Austria",
        "rank": 3,
        "title": "Farbenspiel",
        "year": 2013,
        "certification": "18x Platinum"

    },
    {
        "country": "Austria",
        "rank": 4,
        "title": "Geld oder Leben!",
        "year": 1985,
        "certification": "5x Platinum"

    },
    {
        "country": "Canada",
        "rank": 2,
        "title": "Come on over",
        "year": 1997,
        "certification": "Diamond"

    },
    {
        "country": "Canada",
        "rank": 4,
        "title": "Let's Talk About Love",
        "year": 1998,
        "certification": "Diamond"

    }, {
        "country": "Canada",
        "rank": 5,
        "title": "The Bodyguard Soundtrack",
        "year": 1992,
        "certification": "Diamond"

    }, {
        "country": "Switzerland",
        "rank": 1,
        "title": "Gold: Greatest Hits",
        "year": 1992,
        "certification": "10xPlatinum"

    }, {
        "country": "Switzerland",
        "rank": 2,
        "title": "Brothers in Arms",
        "year": 1985,
        "certification": "6xPlatinum"

    }, {
        "country": "Switzerland",
        "rank": 3,
        "title": "Romanza",
        "year": 1996,
        "certification": "7xPlatinum"

    }, {
        "country": "Switzerland",
        "rank": 4,
        "title": "Thriller",
        "year": 1982,
        "certification": "6× Platinum"

    }, {
        "country": "Switzerland",
        "rank": 5,
        "title": "Let's Talk About Love",
        "year": 1997,
        "certification": "6xPlatinum"

    }, {
        "country": "Switzerland",
        "rank": 6,
        "title": "Greatest Hits",
        "year": 1981,
        "certification": "5× Platinum"

    }, {
        "country": "Switzerland",
        "rank": 10,
        "title": "Dangerous",
        "year": 1991,
        "certification": "7xPlatinum"

    }, {
        "country": "Spain",
        "rank": 1,
        "title": "Mas",
        "year": 1997,
        "certification": "	22xPlatinum"

    }, {
        "country": "Spain",
        "rank": 6,
        "title": "Thriller",
        "year": 1982,
        "certification": "11× Platinum"

    }, {
        "country": "Spain",
        "rank": 3,
        "title": "Descanso Dominical",
        "year": 1988,
        "certification": "13xPlatinum"

    }
];

module.exports = countryApi;


function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); };

countryApi.register = function(app, dbmanu) {
    console.log("Resgistering roots for country-stats api");


    //////////////////DOCUMENTS
    app.get(API_BASE_PATH + "country-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3898111/collection/RVu1HqeJ");
    });
    //////////////////IDENTIFICACION
    app.get(API_BASE_PATH + "secure/country-stats", (req, res) => {
        console.log(Date() + " - new GET /country-stats");
        var apikey = req.query.apikey;
        if (apikey == "SOS1718-05") {
            dbmanu.find({}).toArray((err, records) => {
                if (err) {
                    console.log("Error accesing DB");
                    res.sendStatus(500);
                }
                if (records.length == 0) {
                    res.sendStatus(404);
                }
                else {
                    res.send(records.map(b => {
                        delete b._id;
                        return b;
                    }));
                }
            });
        }
        else {
            res.sendStatus(401)
        }
    });

    //////////////////LOAD INITIAL DATA///////////////////////////////

    app.get(API_BASE_PATH + "country-stats/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /country-stats/loadInitialData");

        dbmanu.find({}).toArray((err, records) => {
            if (err) {
                console.log("Error accesing DB");
                process.exit(0);
            }
            if (records.length == 0) {
                dbmanu.insert(initialdata);
                console.log("DB initialized with " + initialdata.length + "contacts");


            }
            else {
                console.log("Cant load initial data when the database isnt empty");
            }
            res.send(initialdata);
        });


    });


    ////////////////////GET ANALYTICS

    app.get(API_BASE_PATH + "country-stats/analytics", (req, res) => {

        console.log(Date() + " - GET /country-stats/analytics");
        var graphData = [];
        var finalData = [];
        var countries = [];

        dbmanu.find({}).toArray((err, records) => {
            if (err || records.length == 0) {
                console.error("Error accesing DB");
                return;
            }
            else

                for (var i = 0; i < records.length; i++) {
                    var item = records[i];
                    if (item in graphData) {
                        console.log("ocupado");
                    }
                    else {
                        graphData.push({ "x": item.year, "country": item.country, "name": item.title, "z": 1, "y": item.rank, "certification": item.certification });
                    }
                }
            for (var i = 0; i < graphData.length - 1; i++) {

                var title = graphData[i].name;
                var country = graphData[i].country;
                var year = graphData[i].x;
                var popularity = graphData[i].z;
                var Avgrank = graphData[i].y;
                var sumRank = graphData[i].y;

                var sumCertifications = graphData[i].certification;

                for (var j = i + 1; j < graphData.length; j++) {
                    if (graphData[j].name == title) {
                        popularity++; 
                        sumRank = sumRank + graphData[j].y;
                        Avgrank = parseInt(sumRank) / parseInt(popularity);

                        sumCertifications = sumCertifications + ", " + graphData[j].certification;

                    }
                }
                if (countries.includes(title)) {}
                else {
                    finalData.push({ "x": year, "country": country, "name": title, "z": popularity, "y": Avgrank, "certifications": sumCertifications });
                    countries.push(title)
                }

            }
            res.send(finalData);
        });

    });

    ////////////////////GET ANALYTICS 3 TAUCHARTS

    app.get(API_BASE_PATH + "country-stats/analytics3", (req, res) => {

        console.log(Date() + " - GET /country-stats/analytics3");
        var graphData = [];


        dbmanu.find({}).toArray((err, records) => {
            if (err || records.length == 0) {
                console.error("Error accesing DB");
                return;
            }
            else

                for (var i = 0; i < records.length; i++) {
                    var item = records[i];
                    graphData.push({ "cycleTime": item.year, "team": item.country, "effort": item.rank });

                }
            res.send(graphData);
        });

    });




    ////////////////////GET RECURSO PRINCIPAL////////////////////
    app.get(API_BASE_PATH + "country-stats", (req, res) => {
        console.log(Date() + " - GET /country-stats");
        var query = req.query;
        var limit = 0;
        var offset = 0;
        var cota = {};
        var dbq = {};
        Object.keys(query).forEach(p => {
            if (p == "from") {
                cota["$gt"] = JSON.parse(query[p]);
            }
            else if (p == "to") {
                cota["$lt"] = JSON.parse(query[p]);
                dbq["rank"] = cota;
            }
            else if (p == "limit") {
                limit = JSON.parse(query[p]);
            }
            else if (p == "offset") {
                offset = JSON.parse(query[p]);
            }
            else {
                try {
                    dbq[p] = JSON.parse(query[p]);
                }
                catch (e) {
                    dbq[p] = query[p];
                }
            }


        });
        dbmanu.find(dbq).skip(offset).limit(limit).toArray((err, records) => {

            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            else if (records.length == 0) {
                res.sendStatus(404);
            }
            else {
                res.send(records.map((r) => {
                    delete r._id;
                    return r;
                }));

            }
        });

    });

    //////////////////OPERACIONES CONJUNTO DATOS///////////////////

    ////POST TOTAL, CREA UN RECURSO NUEVO
    /*
    app.post(API_BASE_PATH + "country-stats", (req, res) => {
        console.log(Date() + " - POST /country-stats");
        var contact = req.body;

        dbmanu.find({ "country": contact.country, "rank": contact.rank }).toArray((err, bests) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);

            }
            else if (Object.keys(contact).length != 5) {
                res.sendStatus(400);

            }
            else if (bests.length == 0) {
                dbmanu.insert(contact);
                res.sendStatus(201);

            }
            else {
                res.sendStatus(409);
            }


        }); 

    });*/
  

    app.post(API_BASE_PATH + "country-stats", (req, res) => {

        console.log(Date() + " - POST /country-stats");
        var country = req.body;
        console.log("is Number tank? =" +     isNumber (country.rank) + ", is Number year? = " +  isNumber (country.year) );
        dbmanu.find({ "country": country.country, "rank": parseInt(country.rank, 0) }).toArray((err, countryStats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }


            

            if (Object.keys(country).length !== 5 ||  !isNumber (country.rank) || !isNumber (country.year)) {

                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);

            }
            
            
            
            else if (countryStats.length !== 0) {

                res.sendStatus(409);

            }
            else {
                dbmanu.insert(country);
                res.sendStatus(201);
            }

        });

    });

    ////////GET ANALYTICS 2


    app.get(API_BASE_PATH + "country-stats/analytics2", (req, res) => {

        console.log(Date() + " - GET /country-stats/analytics2");
        var graphData = [];
        var finalData = [];
        var countries = [];

        dbmanu.find({}).toArray((err, records) => {
            if (err || records.length == 0) {
                console.error("Error accesing DB");
                return;
            }
            else

                for (var i = 0; i < records.length; i++) {
                    var item = records[i];
                    if (item in graphData) {
                        console.log("ocupado");
                    }
                    else {
                        graphData.push({ "country": item.country, "z": 1 });
                    }
                }


            for (var i = 0; i < graphData.length - 1; i++) {

                var title = graphData[i].name;
                var country = graphData[i].country;
                var suma = graphData[i].z;

                for (var j = i + 1; j < graphData.length; j++) {
                    if (graphData[j].country == country) {
                        suma++;

                    }
                }
                if (countries.includes(country)) {}
                else {
                    finalData.push({ "country": country, "popularity": suma });
                    countries.push(country)
                }

            }
            res.send(finalData);
        });

    });




    ////PUT TOTAL, DA ERROR    
    app.put(API_BASE_PATH + "country-stats", (req, res) => {
        console.log(Date() + " - PUT /country-stats");
        res.sendStatus(405);
    });

    app.put(API_BASE_PATH + "country-stats/:name", (req, res) => {
        var country = req.params.name;
        console.log(Date() + " - PUT /country-stats/" + country);
        res.sendStatus(405);
    });

    ////DELETE TOTAL, BORRA TODOS LOS RECURSOS    
    app.delete(API_BASE_PATH + "country-stats", (req, res) => {
        console.log(Date() + " - DELETE /country-stats");
        dbmanu.remove({}, { multi: true });
        res.sendStatus(200);
    });

    ///////////////OPERACIONES UN SOLO RECURSO/////////////////

    ////GET INDIVIDUAL, DEVUELVE TODOS LOS DATOS RECOGIDOS PARA UN PAÍS    
    app.get(API_BASE_PATH + "country-stats/:name", (req, res) => {
        var name = req.params.name;
        console.log(Date() + " - GET /country-stats/" + name);



        dbmanu.find({ "country": name }).toArray((err, contacts) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatud(500);
                return;
            }
            else if (contacts.length == 0) {
                res.sendStatus(404);
            }
            res.send(contacts.map((c) => {
                delete c._id;
                return c;
            }));
        });

    });

    ////DEVUELVE EL ALBUM MÁS VENDIDO PARA UN PAÍS Y UN RANGO    
    app.get(API_BASE_PATH + "country-stats/:name/:rank", (req, res) => {
        var name = req.params.name;
        var rank = req.params.rank;
        var rankStr = parseInt(rank, 0);
        console.log(Date() + " - GET /country-stats/" + name + " rank:" + rank);


        dbmanu.find({ "country": name, "rank": rankStr }).toArray((err, contacts) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatud(500);
                return;
            }
            else if (contacts.length == 0) {
                res.sendStatus(404);
            }
            res.send(contacts.map((c) => {
                delete c._id;
                return c;
            })[0]);
        });

    });


    ////BORRA TODOS LOS DATOS PERTINENTES A UN PAÍS    
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

    /////PROXY
    var apiServerHostST = "https://sos1718-08.herokuapp.com";
    app.use("/proxyST", function(req, res) {
        var url = apiServerHostST + req.url;
        req.pipe(request(url)).pipe(res);
    });

    var apiServerHostPS = "https://sos1718-04.herokuapp.com";
    app.use("/proxyPS", function(req, res) {
        var url = apiServerHostPS + req.url;
        req.pipe(request(url)).pipe(res);
    });


    var apiServerHostPS = "https://api.discogs.com/database";
    app.use("/proxyDisc", function(req, res) {
        var url = apiServerHostPS + req.url;
        req.pipe(request(url)).pipe(res);
    });


    ////BORRA UN ÁLBUM DE UN PAÍS EN UN RANGO    
    app.delete(API_BASE_PATH + "country-stats/:name/:rank", (req, res) => {
        var name = req.params.name;
        var rank = req.params.rank;
        var rankStr = parseInt(rank, 0);
        console.log(Date() + " - DELETE /country-stats/" + name);

        dbmanu.remove({ "country": name, "rank": rankStr }, function(err, num) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(num);

        });

        res.sendStatus(200);

    });


    ////POST INDIVIDUAL, DEVUELVE ERROR    
    app.post(API_BASE_PATH + "country-stats/:name", (req, res) => {
        var name = req.params.name;
        console.log(Date() + " - POST /country-stats/" + name);
        res.sendStatus(405);
    });

    app.post(API_BASE_PATH + "country-stats/:name/:rank", (req, res) => {
        var name = req.params.name;
        var rank = req.params.rank;
        console.log(Date() + " - POST /country-stats/" + name + " rank: " + rank);
        res.sendStatus(405);
    });

    ////PUT INDIVIDUAL, ACTUALIZA EL ALBUM PARA UN PAÍS Y RANGO ESPECÍFICOS    
    app.put(API_BASE_PATH + "country-stats/:name/:rank", (req, res) => {

        var country = req.params.name;
        var rank = req.params.rank;
        var album = req.body;
        console.log(Date() + " - new PUT /country-stats/ " + country + " rank: " + rank);


        if (country != album.country) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
        }
        if (rank != album.rank) {
            res.sendStatus(400);
            console.warn(Date() + " - oh no Hacking attempt!");
        }


        dbmanu.update({ "country": album.country, "rank": album.rank }, album, (err, numUpdated) => {
            if (numUpdated == 0) { res.sendStatud(400); }
            else if (err) {
                console.error("Error accesing DB");
                res.sendStatud(500);
                return;
            }
            console.log("Updated" + numUpdated);
        });

        res.sendStatus(200);
    });


};
