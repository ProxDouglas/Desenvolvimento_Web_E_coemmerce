const mongoose = require("mongoose");
const Anuncio = require("./Anuncio");

const Schema = new mongoose.Schema({

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
    endereço:{
        rua:{
            type: String,
            required: false
        },
        number:{
            type: String,
            required: false
        },
        cep:{
            type: String,
            required: false
        },
        cidade:{
            type: String,
            required: false
        },
        estado:{
            type: String,
            required: false
        }
    },

    favoritos:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio'
    },

    Anuncio:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio'
    }]
})


module.exports = mongoose.model('Usuario', Schema)
