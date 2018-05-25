exports.config = {
    seleniumAddress: "http://localhost:8910",//Direccion
    specs:["T01-loadDataBests.js","T02-addDataBests.js","T01-loadDataWorld.js", "T02-addDataWorld.js","T01-loadDataCountry.js","T02-addDataCountry.js"],//Tests
    capabilities:{
        "browserName": "phantomjs"//navegador
    }
    
}