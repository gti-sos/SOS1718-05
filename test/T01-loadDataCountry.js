/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

describe('Data is loaded', function() {
    it('should show some stats', function() {
        browser
            .get('https://sos171805-mbg1-sos171805mbg.c9users.io/#!/country-stats')
            .then(function() {
                element
                    .all(by.repeater('country in countryStats'))
                    .then(function(countryStats) {
                        browser.driver.sleep(400000)
                        console.log("title: " + browser.getTitle())
                        expect(countryStats.length).toBeGreaterThan(0);
                    });

            });

    });
});
