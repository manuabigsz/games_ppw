class Games {
    constructor(id, nome, descricao, 
        plataforma_id,categoria_id,desenvolvimento_id){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.plataforma_id = plataforma_id;
        this.categoria_id=categoria_id;
        this.desenvolvimento_id=desenvolvimento_id;
    }
}

module.exports = Games;