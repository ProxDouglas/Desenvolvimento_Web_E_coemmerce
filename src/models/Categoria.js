const mongoose = require("mongoose");


const ProdutoSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    caracteristica: {
        type:String,
        required: true
    },
    sub_categoria:[
        {
            nome: {
                type: String,
                required: true
            },
        
            descricao: {
                type: String,
                required: true
            }
        }
    ]
})


module.exports = mongoose.model('Categoria', CategoriaSchema)
