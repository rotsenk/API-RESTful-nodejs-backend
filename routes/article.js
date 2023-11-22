'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

//rutas de prueba
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles', ArticleController.getArticles);

module.exports = router;