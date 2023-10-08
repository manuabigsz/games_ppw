const {Pool} = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let pool = null;

if (isProduction){
    //se está no ambiente de produção, cria o pool e conecta.
    pool = new Pool({
        connectionString : process.env.DATABASE_URL,
        ssl :{
            rejectUnauthorized:false,
        }
    });
} else {
    pool = new Pool({
        user : "postgres",
        password : 'postgres',
        database: 'games_ppw',
        host: 'localhost',
        port: 5432,
    })
}

module.exports = { pool };