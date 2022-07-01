const mongoose = require("mongoose");
const CategoriaSchema = require("./Categoria");


const ProdutoSchema = new mongoose.Schema({

    nome:{
        type: String,
        required: true
    },

    caracteristica: {
        type:String,
        required: true
    },

    categoria: {
        type: String,
        ref: 'categoria',
        
    },

    sub_categoria: {
        type: String,
        ref: 'categoria.sub_categoria'
    },

    cadastrador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    avalizacao_geral: {
        type: Number,
        default: -1
    }
},
{
    versionKey: false
})


module.exports = mongoose.model('Produto', ProdutoSchema)
