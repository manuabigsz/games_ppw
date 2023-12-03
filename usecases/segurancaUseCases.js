const { pool } = require('../config')
const Jogador = require('../entities/jogador')

const autenticaJogadorDB = async (body) => {
    try {           
        const { email, senha } = body
        console.log(email);
        console.log(senha);
        const results = await pool.query(`SELECT * FROM jogador WHERE email = $1 AND senha = $2`,
        [email, senha]);
        
        if (results.rowCount == 0) {
            console.log('if');
            throw "Usuário ou senha inválidos";
        }
        const jogador = results.rows[0];
        
        return new Jogador(jogador.email, jogador.nome, jogador.data_cadastro);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

module.exports = {
    autenticaJogadorDB
}

