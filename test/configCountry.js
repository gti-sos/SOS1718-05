exports.config = {
    
    seleniumAddress: 'http://localhost:8910',
    specs: ['T01-loadDataCountry.js','T02-addDataCountry.js'],
    capabilities: {
        'browserName' : 'phantomjs'
    }
    
}