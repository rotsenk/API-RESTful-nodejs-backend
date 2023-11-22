'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res) => {
        var hola = req.body.hola;
        return res.status(200).send({
            curso: 'Lógica de Programación con Interfaces Gráficas',
            autor: 'Staenly Rivas',
            url: '[building]'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador artículos'
        });
    },

    save: (req, res) => {
        //Recoger parámetros por POST
        var params = req.body;

        //Validar datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (error) {
            return res.status(200).send({
                message: 'Faltan datos por enviar.'
            });
        }

        if (validate_title && validate_content) {
            //Crear el objeto a guardar

            //Asignar valores

            //Guardar artículo

            //Devolver respuesta
            return res.status(200).send({
                message: 'Validación Correcta!'
            });
        }else{
            return res.status(200).send({
                message: 'Los datos no son válidos.'
            });
        }
    }

}; //end controller

module.exports = controller;