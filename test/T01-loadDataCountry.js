/*global expect browser element by*/
var fs = require("fs");
var path = require("path");
describe("Data is loaded", function() {
    it("should show initial countryStats", function() {
        browser.get('https://sos171805-mbg1-sos171805mbg.c9users.io/#!/country-stats').
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
