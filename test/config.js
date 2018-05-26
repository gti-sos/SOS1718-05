exports.config = {
    seleniumAddress: "http://localhost:8910",//Direccion
    specs:["T00-APIBest.js","T01-loadDataBests.js","T02-addDataBests.js","T00-APIWorld.js","T01-loadDataWorld.js", "T02-addDataWorld.js","T01-loadDataCountry.js","T02-addDataCountry.js","T00-APICountry"],//Tests
    
    capabilities:{
        "browserName": "phantomjs"//navegador
    }
    
}