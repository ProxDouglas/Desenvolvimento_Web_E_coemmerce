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

    valor_total:{
        type: Number,
        required: true
    },

    frete:{
        type: Number,
        required: true
    },
    
    pagamento_status:{
        type: Number,
        default: false
    }
},
{
    versionKey: false
})

module.exports = mongoose.model('Entrega', EntregaSchema);