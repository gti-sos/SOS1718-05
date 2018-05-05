exports.config = {
    
    seleniumAddress: 'http://localhost:8910',
    specs: ['T01-loadDataCountry.js'],
    capabilities: {
        'browserName' : 'phantomjs'
    }
    
}