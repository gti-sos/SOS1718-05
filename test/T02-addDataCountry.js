/*global expect browser element by*/
describe("Add country", function(){
    it("should add a new country item",function(){
        browser.get('https://sos171805-mbg1-sos171805mbg.c9users.io').
        then(function(){
            element.all(by.buttonText("Country stats api")).last().click().then(function(){
                
                element.all(by.repeater('country in countryStats')).then(function(initialdata){
                browser.driver.sleep(2000);
                
                element(by.model('newCountry.country')).sendKeys("Spain");
                element(by.model('newCountry.rank')).sendKeys("9");
                element(by.model('newCountry.title')).sendKeys("titlePrueba");
                element(by.model('newCountry.year')).sendKeys("2018");
                element(by.model('newCountry.certification')).sendKeys("ninguna");
                
                element(by.buttonText('Add Item')).click().then(function(){
                    element.all(by.repeater('country in countrytats')).then(function(countrytats){
                       expect(countrytats.length).toEqual(initialdata.length+1); 
                    });
                });
                
                
            }); 
                
                
                
                
            })       
            
        });    
      
        
        
    });
});