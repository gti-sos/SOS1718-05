/*global expect browser element by*/
var fs = require("fs");
var path = require("path");

describe("Add country", function(){
    it("should add a new country stat",function(){
        browser.get('https://sos171805-mbg1-sos171805mbg.c9users.io/#!/').
        then(function(){
            browser.driver.sleep(2000);
            browser
                    .takeScreenshot()
                    .then(function(png) {
                        var stream = fs.createWriteStream(path.join(process.cwd(), 'test', 'output', 'T02-1.png'));
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    });
            element.all(by.buttonText("Country stats api")).click().then(function(){
                browser.driver.sleep(4000);
                element.all(by.repeater('country in countryStats')).then(function(InitialData){
                
                browser
                    .takeScreenshot()
                    .then(function(png) {
                        var stream = fs.createWriteStream(path.join(process.cwd(), 'test', 'output', 'T02.png'));
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    });
                
                console.log("reeee " + InitialData.data)
                console.log("length" + InitialData.length) 
                element(by.model('newCountry.country')).sendKeys("Spain");
                element(by.model('newCountry.rank')).sendKeys("20"); 
                element(by.model('newCountry.title')).sendKeys("pruebaTest");
                element(by.model('newCountry.year')).sendKeys("2018");
                element(by.model('newCountry.certification')).sendKeys("oro x1");
                
                element(by.buttonText('Add Item')).click().then(function(){
                    element.all(by.repeater('country in countryStats')).then(function(countryStats){
                       expect(countryStats.length).toEqual(InitialData.length+1); 
                    });
                });
                
                
            });   
            })       
            
        });    
      
    });
});