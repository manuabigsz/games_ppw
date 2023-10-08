const { pool } = require('../config');
const Categoria = require('../entities/categoria');

const getCategoriaDB = async () => {
    try { 
        const { rows } = await pool.query(`SELECT * FROM categoria ORDER BY id`);
        return rows.map((categoria) => new Categoria(categoria.id, categoria.nome));
    } catch (err) {
        throw "Erro: " + err;
     }
}

const addCategoriaBD = async (body) => {
    try {
        const { nome } = body;
        const results = await pool.query(`INSERT INTO categoria (nome) 
        VALUES ($1) returning id, nome`, [nome]);
        const categoria = results.rows[0];
        if (!categoria) {
            throw new Error("Categoria não foi inserida corretamente.");
        }
        return new Categoria(categoria.id, categoria.nome);
    } catch (err) {
        throw new Error("Erro ao inserir na tabela categoria: " + err.message);
    }
};

const updateCategoriaDB = async(body) =>{
    try{
        const {id, nome} = body;
        const results = await pool.query(`UPDATE categoria SET nome =$2
        WHERE id = $1 returning id, nome`,[id,nome]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser alterado`;
        }
        const categoria = results.rows[0];
        return new Categoria(categoria.id,categoria.nome);
    }catch{
        throw "Erro ao alterar a tabela categoria: " + err;
    }
}

const deleteCategoriaBD = async(id) =>{
    try{
       
        const results = await pool.query(`DELETE FROM categoria WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para
            ser removido`;
        }else{
            return 'categoria removida com sucesso';
        }
    }catch{
        throw "Erro ao remover categoria: " + err;
    }
}

const getCategoriaPorIDBD = async(id) =>{
    try{
       
        const results = await pool.query(`SELECT * FROM  categoria WHERE 
        id = $1 `,[id]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id}`;
        }else{
            const categoria = results.rows[0];
            return new Categoria(categoria.id,categoria.nome);
        }
    }catch{
        throw "Erro ao remover categoria: " + err;
    }
}

module.exports = {getCategoriaDB, 
    addCategoriaBD, 
    updateCategoriaDB, 
    deleteCategoriaBD,
    getCategoriaPorIDBD
};