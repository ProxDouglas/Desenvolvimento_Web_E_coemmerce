const mongoose = require("mongoose");
const Anuncio = require("./Anuncio");

const UsuarioSchema = new mongoose.Schema({

    nome: {
        type:String,
        required: true
    },

    email: {
        type:String,
        required: true
    },

    data_nascimento: {
        type:String,
        required: true
    },

    cpf: {
        type:String,
        required: true
    },

    telefone: {
        type:String,
        required: true
    },

    senha: {
        type:String,
        required: true
    },

    avalizacao: [{
        type: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario',
                required: true
            },
        
            nota: {
                type: Number,
                required: true
            }
        },
        required: false
    }],
    endereco:{
        rua:{
            type: String,
            required: true
        },
        number:{
            type: String,
            required: true
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

    favoritos:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio'
    },

    anuncio:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio'
    }],
    Saldo:{
        type: Number,
        default: 0   
    },
    Status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false

})


module.exports = mongoose.model('Usuario', UsuarioSchema)
