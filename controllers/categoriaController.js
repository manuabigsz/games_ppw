const { getCategoriaDB, addCategoriaBD, updateCategoriaDB, deleteCategoriaBD, getCategoriaPorIDBD } = require ('../usecases/categoriaUseCases');

const getCategoria = async (request,response)=>{
    await getCategoriaDB().then(data => response.status(200).json(data))
    .catch(err=>response.status(400).json({
        status: 'error',
        message : 'erro ao consultar as categorias' + err,
    }))
}

const addCategoria = async (request, response) => {
    try {
        const categoria = await addCategoriaBD(request.body);
        response.status(201).json({
            status: "success",
            message: "Categoria criada com sucesso.",
            objeto: categoria,
        });
    } catch (err) {
        response.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};

const updateCategoria = async(request, response)=>{
    await updateCategoriaDB(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "categoria alterada",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const deleteCategoria = async(request, response)=>{
    await deleteCategoriaBD(request.params.codigo)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "categoria removida",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const getCategoriaPorCodigo = async(request, response)=>{
    await getCategoriaPorIDBD(request.params.codigo)
                .then(data => response.status(200).json(data))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

module.exports = {
    getCategoria, 
    addCategoria, 
    updateCategoria, 
    deleteCategoria,
    getCategoriaPorCodigo};