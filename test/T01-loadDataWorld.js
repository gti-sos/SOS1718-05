var fs= require("fs")
var path = require("path")

//un test puede estar compuesto por varias comprobaciones.
describe("Data is loaded", function(){ //compruebo que los datos se cargan
    //por cada comprobación ponemos it.
    it("tiene que mostrar mas de 6",function(){
     
                                //coloco la dirección del cloud9
        browser.get('https://sos1718vgm-sos171805vgm.c9users.io/#!/world-stats'). //mepermite acceder al navegador donde esta el desplegado
        then(function(){ //cuando cargue la pagina, vas a comrpobar si hay recursos
            element //localizo una parte de la página..all te da todos. que cumplan una condicion (ngrepeat de la vista)
            .all(by.repeater('world in worldStats'))
            .then(function(worldStats){//aqui me devuelve un objeto worldStats que es un array con todos los recursos
             console.log("porque sale vacio??");
             console.log(worldStats);
             browser
                .takeScreenshot()
                .then(function (png){
                     var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01-world.png'));
                     stream.write(new Buffer(png,'base64'));
                     stream.end();
                });
                expect(worldStats.length).toBeGreaterThan(6);
            });        
            
        });
    });
});
