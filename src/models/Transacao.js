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
        required: true
    },

    data:{
        type: Date,
        default: Date.now
    },

    //formato yyyy-mm-dd
    data_limite:{
        type: Date,
        min: Date.now,
        max: new Date( Date.now.getYear() , Date.now.getMouth() ,Date.now.getDay() + parseInt(7)),
        required: true
    },

    valor_total:{
        type: Number,
        required: true
    },

    frete:{
        type: Number,
        required: true
    },

    forma_pagamento:{
        type: Enum['cartao', 'Boleto', 'Pix', 'Deposito'],
        required: true
    },
    
    pagamento_status:{
        type: Enum ['esperando', 'pago', 'cancelado'],
        default: 'esperando'
    }
},
{
    versionKey: false
})

module.exports = mongoose.model('Entrega', EntregaSchema);