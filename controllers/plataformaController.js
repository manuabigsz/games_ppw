const { getPlataformaDB, addPlataformaBD,
     updatePlataformaDB, deletePlataformaDB, 
     getPlataformaPorIDBD } = require ('../usecases/plataformaUseCases');

const getPlataforma = async (request,response)=>{
    await getPlataformaDB().then(data => response.status(200).json(data))
    .catch(err=>response.status(400).json({
        status: 'error',
        message : 'erro ao consultar a tabela plataforma' + err,
    }))
}

const addPlataforma = async(request, response)=>{
    await addPlataformaBD(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "plataforma criada",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const updatePlataforma = async(request, response)=>{
    await updatePlataformaDB(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "plataforma alterada",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const deletePlataforma = async(request, response)=>{
    await deletePlataformaDB(request.params.codigo)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "plataforma removida",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const getPlataformaPorCodigo = async(request, response)=>{
    await getPlataformaPorIDBD(request.params.codigo)
                .then(data => response.status(200).json(data))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

module.exports = {
    getPlataforma, 
    addPlataforma, 
    updatePlataforma, 
    deletePlataforma,
    getPlataformaPorCodigo};