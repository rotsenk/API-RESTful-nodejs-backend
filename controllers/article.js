'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res) => {
        //var hola = req.body.hola;
        return res.status(200).send({
            curso: 'Lógica de Programación con Interfaces Gráficas',
            autor: 'Staenly Rivas',
            url: 'https://bento.me/stanlee'
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
                status: 'error',
                message: 'Faltan datos por enviar.'
            });
        }

        if (validate_title && validate_content) {
            //Crear el objeto a guardar
            var article = new Article();//utilizar la clase del modelo - instanciar

            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar el artículo
            article.save()
                .then(articleStored => {
                    if (!articleStored) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'El artículo no se guardó!'
                        });
                    }

                    // Devolver respuesta
                    return res.status(200).send({
                        status: 'success',
                        article: articleStored
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar el artículo: ' + err.message
                    });
                });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos.'
            });
        }
    },

    //método para mostrar los datos almacenados
    getArticles: (req, res) => {
        //Sacar los datos de la base de dato, usando el modelo
        Article.find({}).sort('-_id').exec()
            .then(articles => {
                if (!articles || articles.length === 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay artículos para mostrar.'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    articles
                });
            })
            .catch(err => {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los artículos: ' + err.message
                });
            });

    }

}; //end controller

module.exports = controller;