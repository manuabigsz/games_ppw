const { Router } = require('express');
const {getGames, addGames, updateGames, deleteGames, getGamesPorCodigo} = require('../controllers/gamesController');

const rotasGames = new Router();

rotasGames.route('/games')
            .get(getGames)
            .post(addGames)
            .put(updateGames)

rotasGames.route('/games/:codigo')
                .delete(deleteGames)
                .get(getGamesPorCodigo)

module.exports = {rotasGames};