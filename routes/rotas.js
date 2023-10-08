const { Router } = require('express');

const { rotasDesenvolvimento } = require('./rotasDesenvolvimento'); 
const { rotasCategoria } = require('./rotasCategoria'); 
const { rotasGames } = require('./rotasGames'); 
const { rotasJogador } = require('./rotasJogador'); 
const { rotasPlataforma } = require('./rotasPlataforma'); 


const rotas = new Router();


rotas.use(rotasDesenvolvimento);
rotas.use(rotasCategoria);
rotas.use(rotasGames);
rotas.use(rotasJogador);
rotas.use(rotasPlataforma);

module.exports = rotas;
