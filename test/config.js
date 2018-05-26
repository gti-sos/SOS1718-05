exports.config = {
    seleniumAddress: "http://localhost:8910",//Direccion
<<<<<<< HEAD
    specs:["T01-loadDataBests.js","T02-addDataBests.js","T01-loadDataWorld.js", "T02-addDataWorld.js","T01-loadDataCountry.js","T02-addDataCountry.js","T00-APICountry"],//Tests
=======
    specs:["T00-APIBest.js","T01-loadDataBests.js","T02-addDataBests.js","T01-loadDataWorld.js", "T02-addDataWorld.js","T01-loadDataCountry.js","T02-addDataCountry.js","T00-APICountry"],//Tests
    
>>>>>>> e4e890fd7b050d16581322993c7129beeb791b89
    capabilities:{
        "browserName": "phantomjs"//navegador
    }
    
}