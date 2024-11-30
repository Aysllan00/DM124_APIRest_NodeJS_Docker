const Pet = require('../model/Pet.js');

module.exports = {
    async inserir(req, res) {
        const petRequest = req.body;

        if (petRequest.idade < 0 || petRequest.idade > 200) {
            return res.status(400).json({
                erro: 'Validação falhou',
                mensagem: 'A idade do pet deve estar entre 0 e 200 anos'
            });
        }

        const petExistente = await Pet.findOne({ nome: petRequest.nome });

        if (petExistente) {
            console.log(`${petExistente.nome} já existe`);
            return res.status(201).json(petExistente);
        }

        try {
            const pet = await Pet.create({
                nome: petRequest.nome,
                raca: petRequest.raca,
                idade: petRequest.idade
            });

            console.log(`${pet.nome} criado!`);
            return res.status(201).json(pet);
        } catch (erro) {
            console.error('Erro ao criar pet:', erro.message);
            return res.status(500).json({ erro: 'Erro interno ao criar o pet' });
        }
    },

    async buscar(req, res) {
        try {
            const { nome, raca } = req.query;

            const filtros = {};
            if (nome) filtros.nome = nome;
            if (raca) filtros.raca = raca;

            const pets = await Pet.find(filtros);

            console.log(`${pets.length} pets encontrados!`);
            return res.status(200).json(pets);
        } catch (erro) {
            console.error('Erro ao buscar pets:', erro.message);
            return res.status(500).json({ erro: 'Erro interno ao buscar os pets' });
        }
    }
};
