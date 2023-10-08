const { pool } = require('../config');
const Plataforma = require('../entities/plataforma');

const getPlataformaDB = async () => {
    try { 
        const { rows } = await pool.query(`SELECT * FROM plataforma ORDER BY id`);
        return rows.map((plataforma) => new Plataforma(plataforma.id, plataforma.nome));
    } catch (err) {
        throw "Erro: " + err;
     }
}

const addPlataformaBD = async (body) => {
    try {
        const { nome } = body;
        const results = await pool.query(`INSERT INTO plataforma (nome) 
        VALUES ($1) returning id, nome`, [nome]);
        const plataforma = results.rows[0];
        if (!plataforma) {
            throw new Error("plataforma não foi inserida corretamente.");
        }
        return new Plataforma(plataforma.id, plataforma.nome);
    } catch (err) {
        throw new Error("Erro ao inserir na tabela plataforma: " + err.message);
    }
};

const updatePlataformaDB = async(body) =>{
    try{
        const {id, nome} = body;
        const results = await pool.query(`UPDATE plataforma SET nome =$2
        WHERE id = $1 returning id, nome`,[id,nome]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser alterado`;
        }
        const plataforma = results.rows[0];
        return new Plataforma(plataforma.id,plataforma.nome);
    }catch{
        throw "Erro ao alterar a tabela plataforma: " + err;
    }
}

const deletePlataformaDB = async(id) =>{
    try{
       
        const results = await pool.query(`DELETE FROM plataforma WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser removido`;
        }else{
            return 'plataforma removida com sucesso';
        }
    }catch{
        throw "Erro ao remover plataforma: " + err;
    }
}

const getPlataformaPorIDBD = async(id) =>{
    try{
       
        const results = await pool.query(`SELECT * FROM  plataforma WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id}`;
        }else{
            const plataforma = results.rows[0];
            return new Plataforma(plataforma.id,plataforma.nome);
        }
    }catch{
        throw "Erro ao remover plataforma: " + err;
    }
}

module.exports = {getPlataformaDB, 
    addPlataformaBD, 
    updatePlataformaDB, 
    deletePlataformaDB,
    getPlataformaPorIDBD
};