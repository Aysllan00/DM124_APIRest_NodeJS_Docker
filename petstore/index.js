require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const mongoose = require('mongoose');
const DB = require('./src/database/config');

let dbUp = true;
const app = express();
app.use(express.json());

mongoose.connection.on('connected', () => dbUp = true);
mongoose.connection.on('disconnected', () => dbUp = false);

app.use((req, res, next) =>{
    console.log(`[MIDDLEWARE] - DB Health Check`);
    if(dbUp){
        next();
    } else{
        return res.status(503).json({
            "type": "PET004",
            "title": "MongoDB fora do ar.",
            "status": 503, 
            "datail": "Não foi possivel conectar ao MongoDb", 
            "instance": "/pet"
        });
    }
});

app.use(routes);

mongoose.connect(DB.DB_URL, DB.DB_SETTINGS)
    .then(() => console.log(`Conectado ao MongoDB: ${DB.DB_URL}`))
    .catch(err => console.log(`Erro ao conectar ao MongoDB: ${err}`));

// Configure a porta para o servidor escutar
const porta = process.env.PORT;

// Inicie o servidor e escute na porta especificada
app.listen(porta, () => {
    console.log(`O servidor está rodando em http://localhost:${porta}`);
});
