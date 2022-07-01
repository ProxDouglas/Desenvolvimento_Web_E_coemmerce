const mongoose = require("mongoose");
const CategoriaSchema = require("./Categoria");


const ProdutoSchema = new mongoose.Schema({

    categoria: {
        type: String,
        ref: 'categoria',
        
    },

    sub_categoria: {
        type: String,
        ref: 'categoria'
    },

    avalizacao_geral: {
        type: Number,
        required: true
    },

    caracteristica: {
        type:String,
        required: true
    }
})


module.exports = mongoose.model('Produto', ProdutoSchema)
