const { Router } = require('express');
const {getCategoria, addCategoria, updateCategoria, deleteCategoria, getCategoriaPorCodigo} = require('../controllers/categoriaController');

const rotasCategoria = new Router();

const { verificaJWT } = require('../controllers/segurancaController')

rotasCategoria.route('/categoria')
            .get(getCategoria)
            .post(addCategoria)
            .put(verificaJWT, updateCategoria)

rotasCategoria.route('/categoria/:codigo')
                .delete(deleteCategoria)
                .get(verificaJWT, getCategoriaPorCodigo)

module.exports = {rotasCategoria};