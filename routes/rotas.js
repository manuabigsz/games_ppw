const { Router } = require('express');
const { login } = require('../controllers/segurancaController');
	 
const { rotasDesenvolvimento } = require('./rotasDesenvolvimento'); 
const { rotasCategoria } = require('./rotasCategoria'); 
const { rotasGames } = require('./rotasGames'); 
const { rotasJogador } = require('./rotasJogador'); 
const { rotasPlataforma } = require('./rotasPlataforma'); 


const rotas = new Router();

rotas.route("/login")
   .post(login)           
	 

rotas.use(rotasDesenvolvimento);
rotas.use(rotasCategoria);
rotas.use(rotasGames);
rotas.use(rotasJogador);
rotas.use(rotasPlataforma);

module.exports = rotas;
