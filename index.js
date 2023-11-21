'use strict'

//cargar el módulo de mongoose
var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;


//uso de promesas para evitar ciertos fallos al conectarse a mongodb
mongoose.promise = global.Promise;

//conexión a mongodb
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log('Conexión a la base de datos correcta!');

        //crear el servidor y escuchar peticiones HTTP
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:'+port);
        });

    });