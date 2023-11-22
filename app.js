'use strict'

//Cargar módulos de node p/crear el servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//Cargar ficheros rutas
var article_routes = require('./routes/article');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS (permitir peticiones desde el frontend)

//Añadir prefijos a rutas
app.use('/api', article_routes);

//Exportar el módulo (fichero actual)
module.exports = app;