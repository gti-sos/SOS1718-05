exports.config = {
    seleniumAddress: "http://localhost:8910",//Direccion
    specs:["T01-loadDataBests.js","T02-addDataBests.js"],//Tests
    capabilities:{
        "browserName": "phantomjs"//navegador
    }
    
}