const { Schema, model } = require('mongoose');

const PetSchema = new Schema(
    {
        nome: { type: String, required: true },
        raca: { type: String, required: true },
        idade: {
            type: Number, required: true,
            min: [0, 'Idade não pode ser inferior a 0 anos'],
            max: [200, 'Idade não pode ser superior a 200 anos']
        },
    },
    {
        timestamps: true
    }
);

module.exports = model('Pet', PetSchema);
