/*global expect browser element by*/
describe("Add country", function(){
    it("should add a new country item",function(){
        browser.get('https://sos171805-mbg1-sos171805mbg.c9users.io').
        then(function(){
            element.all(by.buttonText("Country stats api")).last().click().then(function(){
                
                element.all(by.repeater('best in bests')).then(function(InitialBests){
                browser.driver.sleep(2000);
                
                element(by.model('newBest.country')).sendKeys("Spain");
                element(by.model('newBest.year')).sendKeys("2018");
                element(by.model('newBest.album')).sendKeys("hola");
                element(by.model('newBest.radio')).sendKeys("que");
                element(by.model('newBest.song')).sendKeys("tal");
                
                element(by.buttonText('Add')).click().then(function(){
                    element.all(by.repeater('best in bests')).then(function(bests){
                       expect(bests.length).toEqual(InitialBests.length+1); 
                    });
                });
                
                
            }); 
                
                
                
                
            })       
            
        });    
      
        
        
    });
});