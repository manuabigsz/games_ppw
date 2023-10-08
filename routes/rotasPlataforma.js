const { Router } = require('express');
const {getPlataforma, addPlataforma, updatePlataforma, deletePlataforma, getPlataformaPorCodigo} = require('../controllers/plataformaController');

const rotasPlataforma = new Router();

rotasPlataforma.route('/plataforma')
            .get(getPlataforma)
            .post(addPlataforma)
            .put(updatePlataforma)

rotasPlataforma.route('/plataforma/:codigo')
                .delete(deletePlataforma)
                .get(getPlataformaPorCodigo)

module.exports = {rotasPlataforma};