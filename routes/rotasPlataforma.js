const { Router } = require('express');
const {getPlataforma, addPlataforma, updatePlataforma, deletePlataforma, getPlataformaPorCodigo} = require('../controllers/plataformaController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasPlataforma = new Router();

rotasPlataforma.route('/plataforma')
            .get(getPlataforma)
            .post(addPlataforma)
            .put(verificaJWT,updatePlataforma)

rotasPlataforma.route('/plataforma/:codigo')
                .delete(deletePlataforma)
                .get(verificaJWT,getPlataformaPorCodigo)

module.exports = {rotasPlataforma};