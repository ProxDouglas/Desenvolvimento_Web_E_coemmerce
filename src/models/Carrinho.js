const { Int32 } = require("mongodb");
const mongoose = require("mongoose");


const CarrinhoSchema = new mongoose.Schema({

    comprador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    anuncios:[{
        anuncio:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Anuncio',
        },
        // depois fazemos alteração
        quantidade:{
            type: Number,
            default: 1
        }
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