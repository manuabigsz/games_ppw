const { pool } = require('../config');
const Desenvolvimento = require('../entities/desenvolvimento');

const getDesenvolvimentoDB = async () => {
    try { 
        const { rows } = await pool.query(`SELECT * FROM desenvolvimento ORDER BY nome`);
        return rows.map((desenvolvimento) => new Desenvolvimento(desenvolvimento.id, desenvolvimento.nome));
    } catch (err) {
        throw "Erro: " + err;
     }
}

const addDesenvolvimentoBD = async(body) =>{
    try{
        const {nome} = body;
        const results = await pool.query(`INSERT INTO desenvolvimento (nome) 
        VALUES ($1) returning id, nome`,[nome]);
        const desenvolvimento = results.rows[0];
        return new Desenvolvimento(desenvolvimento.id,desenvolvimento.nome);
    }catch{
        throw "Erro ao inserir na tabela desenvolvimento: " + err;
    }
}

const updateDesenvolvimentoDB = async(body) =>{
    try{
        const {id, nome} = body;
        const results = await pool.query(`UPDATE desenvolvimento SET nome =$2
        WHERE id = $1 returning id, nome`,[id,nome]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser alterado`;
        }
        const desenvolvimento = results.rows[0];
        return new Desenvolvimento(desenvolvimento.id,desenvolvimento.nome);
    }catch{
        throw "Erro ao alterar a tabela desenvolvimento: " + err;
    }
}

const deleteDesenvolvimentoBD = async(id) =>{
    try{
       
        const results = await pool.query(`DELETE FROM desenvolvimento WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser removido`;
        }else{
            return 'Desenvolvedora removida com sucesso';
        }
    }catch{
        throw "Erro ao remover desenvolvimento: " + err;
    }
}

const getDesenvolvimentoPorIDBD = async(id) =>{
    try{
       
        const results = await pool.query(`SELECT * FROM  desenvolvimento WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id}`;
        }else{
            const desenvolvimento = results.rows[0];
            return new Desenvolvimento(desenvolvimento.id,desenvolvimento.nome);
        }
    }catch{
        throw "Erro ao remover desenvolvimento: " + err;
    }
}

module.exports = {getDesenvolvimentoDB, 
    addDesenvolvimentoBD, 
    updateDesenvolvimentoDB, 
    deleteDesenvolvimentoBD,
    getDesenvolvimentoPorIDBD
};