const { Router } = require('express');
const {getDesenvolvimento, addDesenvolvimento, updateDesenvolvimento, deleteDesenvolvimento, getDesenvolvimentoPorCodigo} = require('../controllers/desenvolvimentoController');

const rotasDesenvolvimento = new Router();
const { verificaJWT } = require('../controllers/segurancaController')


rotasDesenvolvimento.route('/desenvolvimento')
            .get(getDesenvolvimento)
            .post(addDesenvolvimento)
            .put(verificaJWT,updateDesenvolvimento)

rotasDesenvolvimento.route('/desenvolvimento/:codigo')
                .delete(deleteDesenvolvimento)
                .get(verificaJWT,getDesenvolvimentoPorCodigo)

module.exports = {rotasDesenvolvimento};