const { Router } = require('express');

const { rotasDesenvolvimento } = require('./rotasDesenvolvimento'); 
const { rotasCategoria } = require('./rotasCategoria'); 
const { rotasGames } = require('./rotasGames'); 


const rotas = new Router();


rotas.use(rotasDesenvolvimento);
rotas.use(rotasCategoria);
rotas.use(rotasGames);


module.exports = rotas;
