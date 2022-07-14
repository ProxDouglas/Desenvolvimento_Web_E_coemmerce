const mongoose = require("mongoose");
const Anuncio = require("./Anuncio");

const UsuarioSchema = new mongoose.Schema({

    id_google: { //id google
        type: String,
        required: false
    },
    nome: {
        type:String,
        required: true
    },

    img: {
        data: Buffer,
        
    },

    email: {
        type:String,
        required: true
    },

    data_nascimento: { //yyyy-mm-dd
        type: Date,
        required: false
    },

    telefone: {
        type:String,
        required: false
    },

    senha: { 
        type:String,
        required: false
    },

    avaliacao: [{
        type: {
            avaliador: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario',
                required: true
            },
        
            nota: {
                type: Number,
                required: true,
                max: 10,
                min: 0 
            }
        },
        required: false
    }],
    endereco:[{
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
    }],

    favoritos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio'
    }],

    anuncio:[{
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio'
        
    }],
    saldo:{
        type: Number,
        default: 0   
    },
    status:{ //ativo e inativo
        type: Boolean,
        default: true
    }
},
{
    versionKey: false

})


module.exports = mongoose.model('Usuario', UsuarioSchema)
