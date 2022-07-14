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
    }]
},
{
    versionKey: false
})


module.exports = mongoose.model('Produto', ProdutoSchema);
