const Pet = require('../model/Pet.js');
 
module.exports = {
    async inserir(req, res) {
        const petRequest = req.body;

        if (petRequest.idade < 0 || petRequest.idade > 200) {
            return res.status(400).json({
                erro: 'Validação falhou',
                status: 400,
                instance: '/pet',
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

            //Spread operator -> ...(nome && {nome: nome}),
            const filtros = {};
            if (nome) filtros.nome = nome;
            if (raca) filtros.raca = raca;

            const pets = await Pet.find(filtros);

            console.log(`${pets.length} pets encontrados!`);
            return res.status(200).json({
                size: pets.length,
                result: pets
            });
        } catch (erro) {
            console.error('Erro ao buscar pets:', erro.message);
            return res.status(500).json({ erro: 'Erro interno ao buscar os pets' });
        }
    },

    async atualizarIdade(req, res) {
        const { nome } = req.params;
        const { idade } = req.body;

        if (idade === undefined || idade < 0 || idade > 200) {
            return res.status(400).json({
                erro: 'Validação falhou',
                status: 400,
                instance: `/pet/${nome}`,
                mensagem: 'A idade do pet deve estar entre 0 e 200 anos'
            });
        }

        try {
            const pet = await Pet.findOneAndUpdate(
                { nome },
                { idade },
                { new: true }
            );

            if (!pet) {
                return res.status(404).json({
                    erro: 'Pet não encontrado',
                    status: 404,
                    instance: `/pet/${nome}`,
                    mensagem: `Nenhum pet com o nome "${nome}" foi encontrado`
                });
            }

            console.log(`${pet.nome} teve a idade atualizada para ${pet.idade} anos!`);
            return res.status(200).json(pet);
        } catch (erro) {
            console.error('Erro ao atualizar idade do pet:', erro.message);
            return res.status(500).json({ erro: 'Erro interno ao atualizar o pet' });
        }
    },

    async excluir(req, res) {
        const { nome } = req.params;

        try {
            const pet = await Pet.findOneAndDelete({ nome });

            if (!pet) {
                return res.status(404).json({
                    erro: 'Pet não encontrado',
                    status: 404,
                    instance: `/pet/${nome}`,
                    mensagem: `Nenhum pet com o nome "${nome}" foi encontrado`
                });
            }

            console.log(`Pet ${nome} excluído com sucesso!`);
            return res.status(200).json({
                mensagem: `Pet "${nome}" foi excluído com sucesso`,
                petExcluido: pet
            });
        } catch (erro) {
            console.error('Erro ao excluir o pet:', erro.message);
            return res.status(500).json({ erro: 'Erro interno ao excluir o pet' });
        }
    }

};
