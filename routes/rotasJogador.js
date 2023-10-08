const { Router } = require('express');
const {getJogador, addJogador, updateJogador, deleteJogador, getJogadorPorID} = require('../controllers/jogadorController');

const rotasJogador = new Router();

rotasJogador.route('/jogador')
            .get(getJogador)
            .post(addJogador)
            .put(updateJogador)

rotasJogador.route('/jogador/:codigo')
                .delete(deleteJogador)
                .get(getJogadorPorID)

module.exports = {rotasJogador};