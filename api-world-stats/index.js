var world = {};
var API_BASE_PATH = "/api/v1/";

var initialdato = [{   //Recursos iniciales
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
    {
        "country":"UK",
        "year":1977,
        "album":"Rumours",
        "artist":"Fleetwood Mac",
        "sale":"40 millones"
    },
    {
        "country":"UK",
        "year":1977,
        "album":"Saturday Night Fever",
        "artist":"Bee Gees ",
        "sale":"40 millones"
    },
   
    
];

module.exports = world;

world.register= function (app,dbvicen){
    console.log("register..");
    
   
 /*  
                                        //LoadInitialData----->cuando esta la lista vacia, al llamarle crea los ejemplos de arriba.
    app.get(API_BASE_PATH + "best-sellers-stats/loadInitialData", (req, res) => {
    console.log(Date() + " - GET /best-sellers-stats/loadInitialData");
                                                 ////////////////////////////////////////////////////////////////////????????? es asi o que?
    dbvicen.find({}).toArray(function(err, records) {//cojo toda la colleción de mi db(ya que {},está vacio)
        if (err) {
            console.error("Error accesing DB");
            process.exit(500);
        }
        if (records.length == 0) { // si records esta vacio, entonces CREATED.
            dbvicen.insert(initialdato);//insertamos en la db todos los recuros iniciales.
            res.sendStatus(201);//CREATED
            console.log("DB initialized with " + initialdato.length + "contacts");

        }
        res.send(initialdato);
    });


}); */
 app.get(API_BASE_PATH + "world-stats/loadInitialData", (req, res) => {
        console.log(Date() + " - new GET /world-stats/loadInitialData");
        
        dbvicen.find({}).toArray((err, world) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            if (world.length == 0) {
                dbvicen.insert(initialdato);
            }

            res.sendStatus(201);
        });

    });





                            //GET, POST, DELETE, PUT(erroneo) para el caso general//
                            ///////////////////////////////////////////////////////
  
     //Enlace donde se encuentra la colección de postman                
app.get(API_BASE_PATH + "world-stats/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/3897742/collection/RVu1HqZr");
    });
    
    //////////////////IDENTIFICACION
app.get(API_BASE_PATH + "secure/world-stats", (req, res) => {
         console.log(Date() + " - new GET /world-stats");
         var apikey = req.query.apikey;
         if(apikey == "SOS1718-05"){
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
        }else{
            res.sendStatus(401)
        }
    });
    
  /*  //GET al recurso inicial.....nos devuelve todos los recursos    
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
*/
//GET GENERAL. DEVUELVE TODOS LOS RECURSOS. BUSQUEDA. PAGINACIÓN.
app.get(API_BASE_PATH + "world-stats", (req, res) => {
        console.log(Date() + " - new GET /world-stats");
        var query = req.query;  //lo que escribimos detras de la "?" se almacena en esta variable: ?country=UK&year=1976
        var limit = 0;          
        var offset = 0;
        var dbq = {}; //objeto vacio
        var vista ={};
        Object.keys(query).forEach(p =>{ //cojo las claves de query(como un map....key-value) y recorro p.                                  
            if(p =="limit"){ //si la clave es = a limit.                                                                             CLAVE  VALOR(string)
                limit = JSON.parse(query[p]); //transformo el valor de dicha clave en un integer y se lo asocio a la var limit..-> "limit":"1976"
            }else if(p == "offset"){//si la clave es igual a offset.                                     .                           hay que pasarlo a int  
                offset = JSON.parse(query[p]);//trasnformo el valor en integer y asocio a la var offset.
            }else if(p=="from"){
                vista["$gt"]=JSON.parse(query[p]); //selecciona aquellos documentos donde el valor del field es mayor.
            }else if(p=="to"){
                vista["$lt"]=JSON.parse(query[p]);//$lt selects the documents where the value of the field is less than.
               dbq["year"]=vista;
            }else{ //en el resto de casos. ej: {"country":"UK", "year":"1987"}
                try{                            /////////////////////////////
                    dbq[p] = JSON.parse(query[p]); //JSON.parse: analiza una cadena de texto como JSON, transformando el valor producido por el análisis.
                }catch(e){
                    dbq[p] = query[p];
                }            ////query[p]--> coge el valor de la clave, como un map
            }  
        });
        
                //try-catch: lanza y coge las excepciones....?
		        //La función de límit() en MongoDB se usa para especificar el número máximo de resultados que se devolverán.
		        //La función skip() decide donde empezar.      
		        console.log(dbq);  //PRUEBAS         // muestra lo que se le ha añadido al objeto dbq.
		        console.log(offset);                 //muestra lo que he almacenado en la var offset.
		        console.log(limit);                 //muestra lo que hay en la var limit.
        dbvicen.find(dbq).limit(limit).skip(offset).toArray((err, records) => {
            //recuperamos los datos de la var dbq:
            //si solo hemos puesto: ?limit=x&offset=x....-> el find()[VACIO] coge toda la colección de mongodb(dbvicen) y limita.
            //si hemos puesto: ?country=UK&year=1976...-> el find(dbq) coge la coleccion que contiene dbq y busca los que coincidan.
            //si hemos puesto: ?country=UK&year=1976&limit=x&offset=x -> busca y limita. busca los que coincidan con dbq y limita los seleccionados.
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            if(records.length == 0){
                res.sendStatus(404);
            }else{
            res.send(records.map(b => {delete b._id; //visto en las practicas.....ELIMINAMOS EL ID.
            return b;}));
            }
        });
                    //console.log(dbq);     //PRUEBAS
                    //console.log(offset);
    });

    //Post al recurso inicial (crea un recurso concreto)
app.post(API_BASE_PATH+"world-stats",(req,res)=>{
        console.log(Date() + " - POST /world-stats");
        var contact = req.body;
        
        dbvicen.find({"country": contact.country, "year":contact.year}).toArray((err, records) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
                
            }else if(Object.keys(contact).length != 5){ //si el recurso creado no contiene TODOS los atributos de un recurso tipo: //BAD REQUEST   
                res.sendStatus(400);//BAD REQUEST
            
            }else if (records.length == 0) {//si records está vacio, es porque no existe ningún recurso así, entonces podemos crearlo.
                dbvicen.insert(contact); //inserto en la db el nuevo contacto.
                res.sendStatus(201); //CREATED
                
            }else{
                res.sendStatus(409); //CONFLICT
            }

        });
        
    });
    
    //PUT al recurso inicial (erroneo, no se puede actualizar aqui)
app.put(API_BASE_PATH + "world-stats", (req, res) => { //al hacer un put en esta dir.
    console.log(Date() + " - PUT /world-stats");       //debe de saltar Method not allowed
    res.sendStatus(405);//method not allowed.                        ///TABLA AZUL///
});

    //DELETE al recurso inicial (eliminamos toda la lista)
app.delete(API_BASE_PATH + "world-stats", (req, res) => { //al hacer un get a esta dir.
    console.log(Date() + " - DELETE /world-stats");////////////////////////////////////////////////////////////////////////////////////////////
    dbvicen.remove({}, { multi: true });
    res.sendStatus(200); //todo ok.
});

                            //GET, POST (erroneo), DELETE, PUT para un recurso en concreto//
                            ///////////////////////////////////////////////////////////////

    //GET a un recurso concreto.
app.get(API_BASE_PATH+"world-stats/:country/:year",(req,res)=>{ //a la dir, le añado los valores de las claves country y year.
        var country = req.params.country; //Lo que escribo en la dir, lo inserto en la var country. 
        var anyo = req.params.year; // Lo que escribo en la dir, lo inserto en la var anyo.
        var year = parseInt(anyo,0); // pasamos a int.
        console.log(Date() + " - GET /world-stats/"+country + " year:"+ anyo);
        //console.log(country);
        //console.log(year);      //PRUEBAS
        
        dbvicen.find({"country" : country, "year" : year }).toArray((err, contacts)=>{ //busco aquellos recursos que coincidan tanto el pais como el año.
            if(err){                                                                  //bucos en mi db los campos que coincidan con las var country & year
                console.error("Error accesing DB");                                   
                res.sendStatud(500); 
                return;
            
            } 
        if(contacts.length == 0){ //si contacts esta vacio, es decir, si no existe ningun recurso que se esta buscando, entonces salta NOT FOUND.
                res.sendStatus(404);
            
        }
        res.send(contacts.map((c)=>{ // los recursos que se encuentran en contacts, le hago un map(transformar) y les elimino el atributo id.
            delete c._id;
            return c;
        })[0]);});
        
    });


    //DELETE A UN RECURSO EN CONCRETO
 app.delete(API_BASE_PATH+"world-stats/:country/:year",(req,res)=>{
        var country = req.params.country; //Lo que escribo en la dir, lo inserto en la var country. 
        var anyo = req.params.year;// Lo que escribo en la dir, lo inserto en la var anyo.
         var year = parseInt(anyo,0);
        console.log(Date() + " - DELETE /world-stats/"+country);
        //elimino de la db los recursos que coincidan con el country & year de la dir
        dbvicen.remove({"country" : country, "year" : year }, function(err, num) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(num);
        
        });
        
    res.sendStatus(200); //todo ok
       
    });
    
    //POST A UN RECURSO CONCRETO (ERROR)
app.post(API_BASE_PATH + "world-stats/:country/:year", (req, res) => {
    var name = req.params.name; 
    console.log(Date() + " - POST /world-stats/" + name); //si haces un post a un recurso concreto salta Method Nor Allowed
    res.sendStatus(405);                                                                        ///TABLA AZUL///
});

    //PUT A UN RECURSO CONCRETO
 app.put(API_BASE_PATH+"world-stats/:country/:year",(req,res)=>{
        var country = req.params.country; // Lo que escribo en la dir, lo inserto en la var country.
        var anyo = req.params.year; // Lo que escribo en la dir, lo inserto en la var anyo.
        var year = parseInt(anyo,0); // transformo a int.
        var contact = req.body; // crea la var contact con el recurso que coincida con las var de entrada.
        //console.log(contact);----------------------------->muestra el recurso completo que coinciden con los params de entrada.
        if(Object.keys(contact).length != 5){ //si el el recurso que se encuentra en contacts, no contiene TODOS sus atributos: BAD REQUEST 
            res.sendStatus(400);//BAD REQUEST 
            
            }
        
        console.log(Date() + " - PUT /world-stats"+country+ " year:"+year);
        
        if(country != contact.country){ //si la var country(sacada de la dir), no es igual al country del recurso: //BAD REQUEST
            res.sendStatus(400);//BAD REQUEST
            console.warn(Date() + " - Hacking attempt!");
        }
        if(year != contact.year){ //si la var year(sacada de la dir), no es igual al year del recurso: //BAD REQUEST
            res.sendStatus(400);//BAD REQUEST
            console.warn(Date() + " - Hacking attempt!");
        }
        if(contact){
            //pruebas
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //update(), actualiza un único recurso.
        dbvicen.update({"country" : contact.country, "year": contact.year}, contact, (err, numUpdated)=>{
            if(numUpdated == 0){res.sendStatud(400);}//BAD REQUEST
            else if(err){
                console.error("Error accesing DB");
                res.sendStatud(500);
                return;
            }
            console.log("Updated" + numUpdated);//NOSE QUE HACE EL NUMUPDATED
        });
        
        res.sendStatus(200); //todo ok
    });

}