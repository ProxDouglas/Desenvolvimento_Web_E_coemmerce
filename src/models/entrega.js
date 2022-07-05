const mongoose = require("mongoose");

/**
 * è necessário mais campos para associar 
 * a uma entidade de entrega como os correios
 */
const EntregaSchema = new mongoose.Schema({

    
    comprador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    compra:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Compra',
        required: true
    },

    //update
    status_entrega:{
        type: String,
        enum: ['pagamento' ,'preparando', 'enviado', 'entregue'],
        default: 'pagamento'
    },

    //post
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
        numero:{
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