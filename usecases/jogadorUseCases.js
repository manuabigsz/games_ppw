const { pool } = require('../config');
const Jogador = require('../entities/jogador');

const getJogadorDB = async () => {
    try { 
        const { rows } = await pool.query(`SELECT * FROM jogador ORDER BY id`);
        return rows.map((jogador) => new Jogador(jogador.id, jogador.nome,jogador.email,jogador.senha,jogador.data_cadastro));
    } catch (err) {
        throw "Erro: " + err;
     }
}

const addJogadorBD = async (body) => {
    try {
        const { nome, email, senha } = body;
        const results = await pool.query(
            `INSERT INTO jogador (nome, email, senha, data_cadastro) 
            VALUES ($1, $2, $3, CURRENT_DATE) 
            RETURNING id, nome, email`,
            [nome, email, senha]
        );
        const jogador = results.rows[0];
        if (!jogador) {
            throw new Error("O jogador não foi inserido corretamente.");
        }
        return new Jogador(jogador.id, jogador.nome, jogador.email);
    } catch (err) {
        throw new Error("Erro ao inserir na tabela jogador: " + err.message);
    }
};


const updateJogadorDB = async(body) =>{
    try{
        const {id, nome} = body;
        const results = await pool.query(`UPDATE jogador SET nome =$2
        WHERE id = $1 returning id, nome`,[id,nome]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser alterado`;
        }
        const jogador = results.rows[0];
        return new Jogador(jogador.id,jogador.nome);
    }catch{
        throw "Erro ao alterar a tabela jogador: " + err;
    }
}

const deleteJogadorBD = async(id) =>{
    try{
       
        const results = await pool.query(`DELETE FROM jogador WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser removido`;
        }else{
            return 'jogador removida com sucesso';
        }
    }catch{
        throw "Erro ao remover jogador: " + err;
    }
}

const getJogadorPorIDBD = async(id) =>{
    try{
       
        const results = await pool.query(`SELECT * FROM  jogador WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id}`;
        }else{
            const jogador = results.rows[0];
            return new Jogador(jogador.id,jogador.nome,jogador.email,jogador.senha,jogador.data_cadastro);
        }
    }catch{
        throw "Erro ao remover jogador: " + err;
    }
}

module.exports = {getJogadorDB, 
    addJogadorBD, 
    updateJogadorDB, 
    deleteJogadorBD,
    getJogadorPorIDBD
};