/*global expect browser element by*/
describe("Data is loaded", function(){
    it("should show 5 items",function(){
        browser.get('https://sos171805-mbg1-sos171805mbg.c9users.io/#!/country-stats').
        then(function(){
            element
            .all(by.repeater('country in countryStats'))
            .then(function(countryStats){
                console.log(countryStats);
                expect(countryStats.length).toEqual(5);
            });        
            
        });
        
        
    });
});

