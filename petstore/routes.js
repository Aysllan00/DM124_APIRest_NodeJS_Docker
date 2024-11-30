const express = require(`express`);

const PetController = require('./src/controller/PetController');

const rootRouter = express.Router();

// Defina um manipulador de rota para o caminho raiz
rootRouter.get('/', (req, res) => {
    res.json({
      "message": "Olá, Mundo!"
    });
  });
  
const petRouter = express.Router();

rootRouter.use(`/pet`, petRouter);

petRouter.post(`/`, PetController.inserir);
petRouter.get(`/`, PetController.buscar);
  
module.exports = rootRouter;