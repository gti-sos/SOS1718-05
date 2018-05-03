exports.config ={
    seleniumAddress: "http://localhost:8910",//Direccion
    specs:["T01-loadData.js"],//Tests
    capabilities:{
        "browserName": "phantomjs"//navegador
    }
    
}