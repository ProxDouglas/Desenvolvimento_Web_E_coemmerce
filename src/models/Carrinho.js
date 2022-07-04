const mongoose = require("mongoose");


const CarrinhoSchema = new mongoose.Schema({

    comprador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    anuncios:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio'
    }],

    preco_total: {
        type: Number,
        default: 0
    }
},
{
    versionKey: false
})

module.exports = mongoose.model('Carrinho', CarrinhoSchema);