'use strict'

var controller = {

    datosCurso: (req, res) => {
        var hora = req.body.hola;
        return res.status(200).send({
            curso: 'Lógica de Programación con Interfaces Gráficas',
            autor: 'Staenly Rivas',
            url: '[building]'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador artículos'
        })
    }

}; //end controller

module.exports = controller;