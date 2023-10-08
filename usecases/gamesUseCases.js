const { pool } = require('../config');
const Games = require('../entities/games');

const getGamesDB = async () => {
    try { 
        const query = `
            SELECT games.id, games.nome, games.descricao,
                   plataforma.nome AS nome_plataforma,
                   categoria.nome AS nome_categoria,
                   desenvolvimento.nome AS nome_desenvolvimento
            FROM games
            JOIN plataforma ON games.plataforma_id = plataforma.id
            JOIN categoria ON games.categoria_id = categoria.id
            JOIN desenvolvimento ON games.desenvolvimento_id = desenvolvimento.id
            ORDER BY games.nome
        `;
        
        const { rows } = await pool.query(query);
        return rows.map((game) => {
            return {
                id: game.id,
                nome: game.nome,
                descricao: game.descricao,
                plataforma: game.nome_plataforma,
                categoria: game.nome_categoria,
                desenvolvimento: game.nome_desenvolvimento
            };
        });
    } catch (err) {
        throw "Erro: " + err;
    }
}


const addGamesBD = async (body) => {
    try {
        const { nome, descricao,plataforma_id, categoria_id, desenvolvimento_id } = body;

        // Verificar se os IDs de plataforma, categoria e desenvolvimento são válidos
        const validaPlataforma = await pool.query("SELECT id FROM plataforma WHERE id = $1", [plataforma_id]);
        const validaCategoria = await pool.query("SELECT id FROM categoria WHERE id = $1", [categoria_id]);
        const validaDesenvolvimento = await pool.query("SELECT id FROM desenvolvimento WHERE id = $1", [desenvolvimento_id]);

        if (!validaPlataforma.rows.length || !validaCategoria.rows.length || !validaDesenvolvimento.rows.length) {
            throw "IDs de plataforma, categoria ou desenvolvimento não são válidos.";
        }

        const results = await pool.query(
            `INSERT INTO games (nome, descricao, plataforma_id, categoria_id, desenvolvimento_id) 
             VALUES ($1, $2, $3, $4,$5) 
             RETURNING id, nome`,
            [nome, descricao, plataforma_id, categoria_id, desenvolvimento_id]
        );

        const games = results.rows[0];
        return new Games(games.id, games.nome, games.descricao,games,plataforma_id,games.categoria_id,games.desenvolvimento_id);
    } catch (err) {
        throw "Erro ao inserir na tabela games: " + err;
    }
}

const updateGamesDB = async (body) => {
    try {
        const { id, nome } = body;

        const results = await pool.query(
            `UPDATE games SET nome = $2
             WHERE id = $1
             RETURNING id, nome`,
            [id, nome]
        );

        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }

        const games = results.rows[0];
        return new Games(games.id, games.nome);
    } catch (err) {
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
            return 'game removido com sucesso';
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
            return new Games(games.id,games.nome,games.descricao,games.plataforma_id,games.categoria_id,games.desenvolvimento_id);
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