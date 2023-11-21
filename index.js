'use strict'

//cargar el módulo de mongoose
var mongoose = require('mongoose');

//conexión a mongodb
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log('La conexión a la bd se ha realizado correctamente!');
    });