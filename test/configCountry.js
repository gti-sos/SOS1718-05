/*global browser */
exports.config = {
    
    seleniumAddress: 'http://localhost:8910',
    specs: ['T01-loadDataCountry.js','T02-addDataCountry.js'],
    capabilities: {
        'browserName' : 'phantomjs'
    },
    params: {
        host: 'localhost',
        port: '8080'
    }
    
};

exports.getAppUrl = function(){
    return "http://"+ browser.param.host+ ":"+browser.params.port;
}
