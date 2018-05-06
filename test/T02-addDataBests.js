/*global expect browser element by*/
describe("Add best", function(){
    it("should add a new best",function(){
        browser.get('https://sos1718-05.herokuapp.com').
        then(function(){
            element.all(by.buttonText("Best stats api")).last().click().then(function(){
                
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