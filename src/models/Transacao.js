const mongoose = require("mongoose");


const EntregaSchema = new mongoose.Schema({

    
    comprador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    vendedor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    anuncio:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio',
        required: true,  
    },

    quantidade_prod:{
        type: Number,
        required: true,
        default: 1
    },

    data:{
        type: Date,
        default: Date.now
    },

    valor_total:{
        type: Number,
        required: true
    },

    frete:{
        type: Number,
        default: 10.50
    },
},
{
    versionKey: false
})

module.exports = mongoose.model('Transacao', TransacaoSchema);