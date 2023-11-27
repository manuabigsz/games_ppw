const {autenticaJogadorDB} = require('../usecases/segurancaUseCases');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request,response)=>{
    await autenticaJogadorDB(request.body).then(
        usuario =>{
            const token = jwt.sign({usuario},process.env.SECRET,{
                expiresIn:300//expira em 5 minutos
            })
            return response.json({auth:true, token:token})
        }
    ).catch(err=>response.status(401).json({auth:false,message:err}));
}

//verifica o token.
function verificaJWT(request,response,next){
    console.log('verfificajwt');
    const token=request.headers['authorization'];
    if(!token) return response.status(401).json({auth:false,message:'nenhum token recebido.'});

    jwt.verify(token,process.env.SECRET, function (err,decoded){
        if(err) return response.status(401).json({auth:false,message:'erro ao autenticar o token.'});

        console.log("Usuário" + JSON.stringify(decoded.usuario));
        request.usuario=decoded.usuario;
        //o next chama o priximo elemento da pilha para poder ser executado.
        next();
    })
}


module.exports={login,verificaJWT}