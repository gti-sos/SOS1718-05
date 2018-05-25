/*global expect browser element by*/
var newman = require("newman");
var path = require("path");

describe("API should work", function() {
    newman.run({
        
        collection: require(path.join(process.cwd(),"test/collections","SOS1718-05 CountryStats BackendTests.postman_collection.json"))
        reporters:"cli"
        
    }, function(err){
        if(err){
            throw(err);
        }
        else{
            console.log("Collection run complete");
        }
    });
});
