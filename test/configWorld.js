exports.config = {//objeto de la configuracion del test, lo que va a cargar protractor.
    //lo primero es la direccion del navegador donde van a estar las pruebas
    seleniumAddress: 'http://localhost:8910',
    //ahora decir cuales son los test que voy a lanzar
    specs: ['T01-loadDataWorld.js'],
    //y ahora el tipo de navegador que voy a utilizar
    capavilities: {
        'browserName' : 'phantomjs'
    }
    
}