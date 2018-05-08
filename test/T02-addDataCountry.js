/*global expect browser element by*/
describe("Add best", function(){
    it("should add a new country stat",function(){
        browser.get('https://sos1718-05.herokuapp.com').
        then(function(){
            element.all(by.buttonText("Country stats api")).last().click().then(function(){
                
                element.all(by.repeater('country in countryStats')).then(function(InitialData){
                browser.driver.sleep(2000);
                
                element(by.model('newCountry.country')).sendKeys("Spain");
                element(by.model('newCountry.rank')).sendKeys("20");
                element(by.model('newCountry.title')).sendKeys("pruebaTest");
                element(by.model('newCountry.year')).sendKeys("2018");
                element(by.model('newCountry.certification')).sendKeys("oro x1");
                
                element(by.buttonText('Add Item')).click().then(function(){
                    element.all(by.repeater('country in countryStats')).then(function(countryStats){
                       expect(countryStats.length).toEqual(InitialData.length); 
                    });
                });
                
                
            }); 
                
                
                
                
            })       
            
        });    
      
        
        
    });
});