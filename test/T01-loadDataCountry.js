/*global expect browser element by*/
var fs = require("fs");
var path = require("path");
var config = require('./configCountry')
describe("Data is loaded", function() {
    it("should show initial countryStats", function() {
        browser.get('https://sos1718-05.herokuapp.com/#!/country-stats').
        then(function() {
            element.all(by.repeater('country in countryStats')).then(function(countryStats) {
                console.log(countryStats);
                browser 
                    .takeScreenshot()
                    .then(function(png) {
                        var stream = fs.createWriteStream(path.join(process.cwd(), 'test', 'output', 'T01-country.png'));
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    }); 
                expect(countryStats.length).toBeGreaterThan(0);
            });
        });
    });
});
