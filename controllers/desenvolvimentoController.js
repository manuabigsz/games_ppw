const { getDesenvolvimentoDB, addDesenvolvimentoBD, updateDesenvolvimentoDB, deleteDesenvolvimentoBD, getDesenvolvimentoPorIDBD } = require ('../usecases/desenvolvimentoUseCases');

const getDesenvolvimento = async (request,response)=>{
    await getDesenvolvimentoDB().then(data => response.status(200).json(data))
    .catch(err=>response.status(400).json({
        status: 'error',
        message : 'erro ao consultar a tabela desenvolvimento' + err,
    }))
}

const addDesenvolvimento = async(request, response)=>{
    await addDesenvolvimentoBD(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "desenvolvimento criado",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const updateDesenvolvimento = async(request, response)=>{
    await updateDesenvolvimentoDB(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "desenvolvimento alterado",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const deleteDesenvolvimento = async(request, response)=>{
    await deleteDesenvolvimentoBD(request.params.codigo)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "desenvolvimento removido",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const getDesenvolvimentoPorCodigo = async(request, response)=>{
    await getDesenvolvimentoPorIDBD(request.params.codigo)
                .then(data => response.status(200).json(data))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

module.exports = {
    getDesenvolvimento, 
    addDesenvolvimento, 
    updateDesenvolvimento, 
    deleteDesenvolvimento,
    getDesenvolvimentoPorCodigo};