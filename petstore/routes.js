const express = require(`express`);

const PetController = require('./src/controller/PetController');
const AuthController = require('./src/controller/AuthController');

const rootRouter = express.Router();
const petRouter = express.Router();

// Defina um manipulador de rota para o caminho raiz
rootRouter.get('/', (req, res) => {
    res.json({
        "message": "Olá, Mundo!"
    });
});

rootRouter.use(`/pet`, AuthController.validaToken, petRouter);

petRouter.post(`/`, PetController.inserir);
petRouter.get(`/`, PetController.buscar);
petRouter.patch('/:nome', PetController.atualizarIdade);
petRouter.delete('/:nome', PetController.excluir);

module.exports = rootRouter; 