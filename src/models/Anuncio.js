const mongoose = require("mongoose");


const AnuncioModel = new mongoose.Schema({

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

    media_avalização: String,

    autor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    topicos:{
        texto: {
            type: String,
            required: true
        },
        id_usuario:{
            type: String,
            required: true
        },
        comentarios: {
            texto: {
                type: String,
                required: true
            },
            id_usuario:{
                type: String,
                required: true
            },
            required: false
        },
        required: false
    }
})

module.exports = AnuncioModel