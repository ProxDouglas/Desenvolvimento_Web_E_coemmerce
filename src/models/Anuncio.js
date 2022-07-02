const mongoose = require("mongoose");


const AnuncioSchema = new mongoose.Schema({

    nome: {
        type:String,
        required: true
    },

    preco: {
        type: Number,
        required: true
    },

    autor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    produto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    },

    avalizacoes: [{ //array
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

    topicos:[{ //array
        type:{
            texto: {
                type: String,
                required: true
            },
            id_usuario:{
                type: String,
                required: true
            },

            comentarios: [{ //array
                type: {
                    texto: {
                        type: String,
                        required: true
                    },
                    id_usuario:{
                        type: String,
                        required: true
                    },
                },
                required: false
            }],
        },
        required: false
    }]
},
{
    versionKey: false
})

module.exports = mongoose.model('Anuncio', AnuncioSchema);