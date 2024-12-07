require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);

// Configure a porta para o servidor escutar
const porta = process.env.PORT;

// Inicie o servidor e escute na porta especificada
app.listen(porta, () => {
    console.log(`O servidor Auth está rodando em http://localhost:${porta}`);
});
