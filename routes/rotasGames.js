const { Router } = require('express');
const {getGames, addGames, updateGames, deleteGames, getGamesPorCodigo} = require('../controllers/gamesController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasGames = new Router();

rotasGames.route('/games')
            .get(getGames)
            .post(addGames)
            .put(verificaJWT,updateGames)

rotasGames.route('/games/:codigo')
                .delete(deleteGames)
                .get(verificaJWT,getGamesPorCodigo)

module.exports = {rotasGames};