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

    Anuncio:[{
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
})


module.exports = mongoose.model('Usuario', Schema)

// Criar Usuário OK
 /**
  * @swagger
  * components:
  *   schemas:
  *      Usuario:
  *         type: object
  *         properties:
  *            nome: 
  *               type: string
  *               description: nome do usuário
  *            email:
  *               type: string
  *               description: e-mail do usuário
  *            data_nascimento:
  *               type: string
  *               description: data de nascimento do usuário
  *            cpf:
  *               type: string
  *               description: nome do usuário 
  *            telefone:
  *               type: string
  *               description: telefone do usuário
  *            senha:
  *               type: string
  *               description: senha do usuário
  *         required:
  *            - nome
  *            - email 
  *            - data_nascimento
  *            - cpf 
  *         exemplo:
  *            - nome: Michael Jackson
  *            - email: Michael.Jackson@gmail.com
  *            - data_nascimento: 11/01/1974
  *            - cpf: 22.222.222-22
  */ 
