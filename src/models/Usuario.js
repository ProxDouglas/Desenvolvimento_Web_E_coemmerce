const mongoose = require("mongoose");
const Anuncio = require("Anuncio");

const Schema = new mongoose.Schema({

    _id: {
        Type: Schema.Types.ObjectId,
        require: false
    },
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
    endereço:{
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
        },
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