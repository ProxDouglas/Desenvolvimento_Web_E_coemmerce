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

    // avalizacao_geral: {
    //     type: Number,
    //     default: null
    // }
},
{
    versionKey: false
})


module.exports = mongoose.model('Produto', ProdutoSchema)
