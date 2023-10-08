const { getGamesDB, addGamesBD, updateGamesDB, deleteGamesBD, getGamesPorIDBD } = require ('../usecases/gamesUseCases');

const getGames = async (request,response)=>{
    await getGamesDB().then(data => response.status(200).json(data))
    .catch(err=>response.status(400).json({
        status: 'error',
        message : 'erro ao consultar a tabela games' + err,
    }))
}

const addGames = async(request, response)=>{
    await addGamesBD(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "games criado",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const updateGames = async(request, response)=>{
    await updateGamesDB(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "games alterado",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const deleteGames = async(request, response)=>{
    await deleteGamesBD(request.params.codigo)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "games removido",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const getGamesPorCodigo = async(request, response)=>{
    await getGamesPorIDBD(request.params.codigo)
                .then(data => response.status(200).json(data))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

module.exports = {
    getGames, 
    addGames, 
    updateGames, 
    deleteGames,
    getGamesPorCodigo};