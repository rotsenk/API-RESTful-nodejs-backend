'use strict'

//cargar el módulo de mongoose
var mongoose = require('mongoose');


//uso de promesas para evitar ciertos fallos al conectarse a mongodb
mongoose.promise = global.Promise;

//conexión a mongodb
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log('La conexión a la base de datos se ha realizado correctamente!');
    });