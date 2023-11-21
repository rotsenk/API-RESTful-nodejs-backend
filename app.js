'use strict'

//Cargar módulos de node p/crear el servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//Cargar ficheros rutas

//añadir una ruta o método de prueba
app.get('/datos-curso', (req, res) => {
    return res.status(200).send({
        curso: 'Lógica de Programación con Interfaces Gráficas',
        autor: 'Staenly Rivas',
        url: '[building]'
    });
});

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//CORS (permitir peticiones desde el frontend)

//Añadir prefijos a rutas

//Exportar el módulo (fichero actual)
module.exports = app;