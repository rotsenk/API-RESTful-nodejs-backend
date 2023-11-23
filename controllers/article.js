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

        var query = Article.find({});

        //adjuntar límite a la query
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }


        //Sacar los datos de la base de dato, usando el modelo
        query.sort('-_id').exec()
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
    },

    //método que saca un sólo artículo
    getArticle: (req, res) => {
        //Obtener el id de la url
        var articleId = req.params.id;

        //Comprobar que existe
        if (!articleId || articleId == null) {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos.'
            });
        }

        // Buscar el artículo utilizando Promesas
        Article.findById(articleId)
            .then(article => {
                if (!article) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'No se encontró el artículo.'
                    });
                }

                return res.status(200).json({
                    status: 'success',
                    article
                });
            })
            .catch(error => {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al obtener el artículo. '
                });
            });
    },

    //método para actualizar datos
    update: (req, res) => {
        //Obtener el id del artículo por la url
        var articleId = req.params.id;

        //Obtener los datos que llegan por put
        var params = req.body;

        //Validar los datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(404).json({
                status: 'error',
                message: 'Faltan datos por enviar. '
            });
        }

        if (validate_title && validate_content) {
            //Find and Update
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true })
                .then(articleUpdated => {
                    if (!articleUpdated) {
                        return res.status(404).json({
                            status: 'error',
                            message: 'No existe el artículo.'
                        });
                    }

                    return res.status(200).json({
                        status: 'success',
                        article: articleUpdated
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        status: 'error',
                        message: 'Error al actualizar '
                    });
                });

        } else {
            //Devolver respuesta
            return res.status(200).json({
                status: 'error',
                message: 'Validación incorrecta! '
            });
        }
    },

    //Método para eliminar
    delete: (req, res) => {
        //obtener el id de la url
        var articleId = req.params.id;

        //Find And Delete
        Article.findOneAndDelete({_id: articleId})
        .then( articleRemoved => {
            if (!articleRemoved) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se eliminó. Es posible que el artículo no exista! '
                });
            }
            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: 'error',
                message: 'Error al eliminar. '
            });
        });
    }

}; //end controller

module.exports = controller;