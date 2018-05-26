exports.config = {
    seleniumAddress: "http://localhost:8910",//Direccion
<<<<<<< HEAD
    specs:["T01-loadDataBests.js","T02-addDataBests.js","T01-loadDataWorld.js","T02-addDataWorld.js","T01-loadDataCountry.js","T02-addDataCountry.js"],//Tests
=======
    specs:["T01-loadDataBests.js","T02-addDataBests.js","T01-loadDataWorld.js", "T02-addDataWorld.js","T01-loadDataCountry.js","T02-addDataCountry.js","T00-APICountry"],//Tests
>>>>>>> 9853de3ba670b55ea163c59ab013567f85e9f843
    capabilities:{
        "browserName": "phantomjs"//navegador
    }
    
}