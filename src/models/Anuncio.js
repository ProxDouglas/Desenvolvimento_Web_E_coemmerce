const mongoose = require("mongoose");
const topico = require("Topico");

const Schema = new mongoose.Schema({

    nome: {
        type:String,
        required: true
    },

    emial: {
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
        type: [topico.Schema],
        required: false
    }
})


module.exports = mongoose.model('Anuncio', Schema)