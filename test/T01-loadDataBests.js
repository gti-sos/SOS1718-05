/*global expect browser element by*/
describe("Data is loaded", function(){
    it("should show 5 best",function(){
        browser.get('https://sos171805jpr-sos171805jpr.c9users.io/#!/best-stats').
        then(function(){
            element
            .all(by.repeater('best in bests'))
            .then(function(bests){
                console.log(bests);
                expect(bests.length).toEqual(5);
            });        
            
        });
        
        
    });
});

