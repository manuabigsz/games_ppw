const { getJogadorDB, addJogadorBD, updateJogadorDB, deleteJogadorBD, getJogadorPorIDBD } = require ('../usecases/jogadorUseCases');

const getJogador = async (request,response)=>{
    await getJogadorDB().then(data => response.status(200).json(data))
    .catch(err=>response.status(400).json({
        status: 'error',
        message : 'erro ao consultar a tabela jogador' + err,
    }))
}

const addJogador = async(request, response)=>{
    await addJogadorBD(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "jogador criado",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const updateJogador = async(request, response)=>{
    await updateJogadorDB(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "jogador alterado",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const deleteJogador = async(request, response)=>{
    await deleteJogadorBD(request.params.codigo)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "jogador removido",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const getJogadorPorID = async(request, response)=>{
    await getJogadorPorIDBD(request.params.codigo)
                .then(data => response.status(200).json(data))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

module.exports = {
    getJogador, 
    addJogador, 
    updateJogador, 
    deleteJogador,
    getJogadorPorID};