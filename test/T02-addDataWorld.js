describe("Add recurso", function(){
    it("should add a new recurso",function(){
        browser
            .get('https://sos1718vgm-sos171805vgm.c9users.io/#!/world-stats').
            then(function(){
            
            element
                .all(by.repeater('world in worldStats')).then(function(initialdato){
                browser.driver.sleep(2000); //duermo durante unos segundos para asegurarme que se ha cargado todo correctamente
                
                //tengo que cargar tantos element como input en la vista....(5)
                element(by.model('newWorld.country')).sendKeys("Matalascañas");
                                                    //sendkeys es como si el usuario escrbiera dentro del input
                element(by.model('newWorld.year')).sendKeys("2020");
                
                element(by.model('newWorld.album')).sendKeys("venao");
                
                element(by.model('newWorld.artist')).sendKeys("vicente");
                
                element(by.model('newWorld.sale')).sendKeys("50cent");
                
                //localizo el boton que tiene ADD y le digo click
                element(by.buttonText('Add')).click().then(function(){ //verificamos que tenemos los recursos iniciales mas 1.
                    element                                             //verificamos el post.
                        .all(by.repeater('world in worldStats')).then(function(worldStats){
                         expect(worldStats.length).toEqual(initialdato.length+1); 
                    });
                });
                
                
            });        
            
        });    
    });
});