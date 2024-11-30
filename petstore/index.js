const express = require('express');
const routes = require('./routes');

const mongoose = require(`mongoose`);
const DB = require(`./src/database/config`);
//const { DB_URL, DB_SETTINGS } = require('./src/database/config');

const app = express();
app.use(express.json());

app.use(routes);

mongoose.connect(DB.DB_URL, DB.DB_SETTINGS)
    .then(() => console.log(`Conectado ao MongoDB: ${DB.DB_URL}`))
    .catch(err => console.log(`Erro ao conectar ao MongoDB: ${err}`))

// Configure a porta para o servidor escutar
const porta = process.env.PORT || 3000;

// Inicie o servidor e escute na porta especificada
app.listen(porta, () => {
  console.log(`O servidor está rodando em http://localhost:${porta}`);
});

