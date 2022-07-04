const mongoose = require("mongoose");


const EntregaSchema = new mongoose.Schema({

    comprador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    transacao:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transacao',
        required: true
    },

    comprador:{
        type: mongoose.Schema.Types.ObjectId,
    },

    status_entrega:{
        type: Enum ['preparando', 'enviado', 'entregue'],
        default: 'preparando'
    },

    avaliacao:{
        avaliador:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    },

    endereco:{
        rua:{
            type: String,
            required: true
        },
        number:{
            type: String,
            required: true
        },
        apt:{
            type: String
        },
        cep:{
            type: String,
            required: true
        },
        cidade:{
            type: String,
            required: true
        },
        estado:{
            type: String,
            required: true
        }
    },
},
{
    versionKey: false
})

module.exports = mongoose.model('Entrega', EntregaSchema);