/*global expect browser element by*/
var fs = require("fs");
var path = require("path");
describe("Data is loaded", function() {
    it("should show 5 best", function() {
        browser.get('https://sos171805jpr-sos171805jpr.c9users.io/#!/best-stats').
        then(function() {
            element.all(by.repeater('best in bests')).then(function(bests) {
                console.log(bests);
                browser
                    .takeScreenshot()
                    .then(function(png) {
                        var stream = fs.createWriteStream(path.join(process.cwd(), 'test', 'output', 'T01.png'));
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    });
                expect(bests.length).toEqual(5);
            });
        });
    });
});
