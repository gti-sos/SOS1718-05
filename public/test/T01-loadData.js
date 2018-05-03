/*global expect browser element by*/
/*describe("Data is loaded", function(){
    it("should show me 5 contacts",function(){
        browser
        .get('https://sos171805jpr-sos171805jpr.c9users.io/#!/best-stats')
        .then(function(){
            element.all(by.repeater('best in bests'))
            .then(function(bests){
                console.log(bests);
                expect(bests.length).toEqual(5);
            });        
            
        });
        
        
    });
});*/
var fs = require("fs");
var path = require("path");

describe('Data is loaded', function(){  //compruebo que los datos se cargan
    it('should show same homicides', function(){ //para cada una de las comprobaciones meto la palabra it
        browser
            .get('https://sos171805jpr-sos171805jpr.c9users.io/index.html#!/best-stats') //accede a la direccion
            .then(function(){
                browser.driver.sleep(5000); 
                element
                    .all(by.repeater('best in bests'))  //te devuelve todos los elementos de la pagina que ha cargado que cumplan una condicion, que contengan el ng-repeat
                    .then(function(best){ //carga todos los homicidios
                        browser
                            .takeScreenshot()
                            .then(function(png){
                                
                                var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01.png'));
                                stream.write(new Buffer(png,'base64'));
                                stream.end();
                            });
                    
                    
                        
                        expect(best.length).toEqual(0);  //tienes que haber mas de 1 homicidio
                    });
            });
        
       
    });
});