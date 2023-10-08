const { pool } = require('../config');
const Games = require('../entities/games');

const getGamesDB = async () => {
    try { 
        const { rows } = await pool.query(`SELECT * FROM games ORDER BY nome`);
        return rows.map((games) => new Games(games.id, games.nome, games.descricao, games.plataforma_id,gamescategoria_id,games.desenvolvimento_id));
    } catch (err) {
        throw "Erro: " + err;
     }
}

const addGamesBD = async(body) =>{
    try{
        const {nome} = body;
        const results = await pool.query(`INSERT INTO games (nome) 
        VALUES ($1) returning id, nome`,[nome]);
        const games = results.rows[0];
        return new Games(games.id,games.nome);
    }catch{
        throw "Erro ao inserir na tabela games: " + err;
    }
}

const updateGamesDB = async(body) =>{
    try{
        const {id, nome} = body;
        const results = await pool.query(`UPDATE games SET nome =$2
        WHERE id = $1 returning id, nome`,[id,nome]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser alterado`;
        }
        const games = results.rows[0];
        return new Games(games.id,games.nome);
    }catch{
        throw "Erro ao alterar a tabela games: " + err;
    }
}

const deleteGamesBD = async(id) =>{
    try{
       
        const results = await pool.query(`DELETE FROM games WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser removido`;
        }else{
            return 'Desenvolvedora removida com sucesso';
        }
    }catch{
        throw "Erro ao remover games: " + err;
    }
}

const getGamesPorIDBD = async(id) =>{
    try{
       
        const results = await pool.query(`SELECT * FROM  games WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id}`;
        }else{
            const games = results.rows[0];
            return new Games(games.id,games.nome);
        }
    }catch{
        throw "Erro ao remover games: " + err;
    }
}

module.exports = {getGamesDB, 
    addGamesBD, 
    updateGamesDB, 
    deleteGamesBD,
    getGamesPorIDBD
};