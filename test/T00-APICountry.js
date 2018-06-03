/*global expect browser element by*/
var newman = require("newman");
var path = require("path");

describe("API should work", function() {
    newman.run({
        
        collection: require(path.join(process.cwd(),"test/collections","CountryStats.postman_collection")),
        reporters:"cli"
        
    }, function(err){
        if(err){
            throw(err);
        }
        else{
            console.log("Country-stats collection run complete");
        }
    });
});