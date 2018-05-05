describe("Add item", function(){
    it("should add a new item",function(){
        browser
            .get('https://sos171805-mbg1-sos171805mbg.c9users.io/#!/country-stats').
            then(function(){
            
            element
                .all(by.repeater('country in countryStats')).then(function(initialdata){
                browser.driver.sleep(2000); //duermo durante unos segundos para asegurarme que se ha cargado todo correctamente
                
                element(by.model('newCountry.country')).sendKeys("Matalascañas");
                element(by.model('newCountry.rank')).sendKeys("2020");
                element(by.model('newCountry.title')).sendKeys("venao");
                element(by.model('newCountry.year')).sendKeys("vicente");
                element(by.model('newCountry.certification')).sendKeys("50cent");
                
                //localizo el boton que tiene ADD y le digo click
                element(by.buttonText('Add')).click().then(function(){ //verificamos que tenemos los recursos iniciales mas 1.
                    element                                             //verificamos el post.
                        .all(by.repeater('country in countryStats')).then(function(countryStats){
                         expect(countryStats.length).toEqual(initialdata.length+1); 
                    });
                });
                
                
            });        
            
        });    
    });
});