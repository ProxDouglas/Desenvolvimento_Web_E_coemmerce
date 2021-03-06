const mongoose = require("mongoose");


const AnuncioSchema = new mongoose.Schema({

    nome: {
        type:String,
        required: true,
        maxLength: 50,
        minlength: 5
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

    data: {
        type: Date,
        default: Date.now
    },

    estoque:{
        type:Number,
        required: true
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

    topico:[{ //array
        type:{
            texto: {
                type: String,
                required: true,
                maxLength: 300,
                minlength: 5
            },
            autor:{
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },

            data: {
                type: Date,
                default: Date.now
            },

            comentario: [{ //array
                type: {
                    texto: {
                        type: String,
                        required: true,
                        maxLength: 300,
                        minlength: 5
                    },
                    autor:{
                        type: mongoose.Schema.Types.ObjectId,
                        required: true
                    },

                    data: {
                        type: Date,
                        default: Date.now
                    }
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