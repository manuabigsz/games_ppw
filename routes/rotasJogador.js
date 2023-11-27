const { Router } = require('express');
const {getJogador, addJogador, updateJogador, deleteJogador, getJogadorPorID} = require('../controllers/jogadorController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasJogador = new Router();

rotasJogador.route('/jogador')
            .get(getJogador)
            .post(addJogador)
            .put(verificaJWT,updateJogador)

rotasJogador.route('/jogador/:codigo')
                .delete(deleteJogador)
                .get(verificaJWT,getJogadorPorID)

module.exports = {rotasJogador};