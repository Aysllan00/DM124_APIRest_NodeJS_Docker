const express = require(`express`);

const AuthController = require('./src/controller/AuthController');

const rootRouter = express.Router();
const authRouter = express.Router();

// Defina um manipulador de rota para o caminho raiz
rootRouter.get('/', (req, res) => {
    res.json({
        "message": "Olá, Mundo!"
    });
});

rootRouter.use(`/auth`, authRouter);

authRouter.post(`/login`, AuthController.login);
authRouter.post(`/validaToken`, AuthController.validaToken);

module.exports = rootRouter;