const { Router } = require('express');
const {getDesenvolvimento, addDesenvolvimento, updateDesenvolvimento, deleteDesenvolvimento, getDesenvolvimentoPorCodigo} = require('../controllers/desenvolvimentoController');

const rotasDesenvolvimento = new Router();

rotasDesenvolvimento.route('/desenvolvimento')
            .get(getDesenvolvimento)
            .post(addDesenvolvimento)
            .put(updateDesenvolvimento)

rotasDesenvolvimento.route('/desenvolvimento/:codigo')
                .delete(deleteDesenvolvimento)
                .get(getDesenvolvimentoPorCodigo)

module.exports = {rotasDesenvolvimento};