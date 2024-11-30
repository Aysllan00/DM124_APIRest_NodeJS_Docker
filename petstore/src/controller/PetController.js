const Pet = require('../model/Pet.js');

module.exports = {
    async inserir(req, res){
        const petRequest = req.body;
        const petExistente = await Pet.findOne({nome:petRequest.nome});

        if(petExistente){
            console.log(`${petExistente.nome} já existe`);
            return res.status(201).json(petExistente);    
        }

        const pet = await Pet.create({
            nome: petRequest.nome,
            raca: petRequest.raca,
            idade: petRequest.idade
        });
        
        console.log(`${pet.nome} criado!`);
        return res.status(201).json(pet);
    },
    async buscar(req, res){
        const nomeQuery = req.query.nome;
        let pets =  [];

        if(nomeQuery){
            pets = await Pet.find({nome: nomeQuery});
        } else {
            pets = await Pet.find();
        }

        console.log(`${pets.length} pets encontrados!`);
        return res.status(200).json(pets);
    }
}