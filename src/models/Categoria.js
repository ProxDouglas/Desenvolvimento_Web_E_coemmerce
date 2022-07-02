const mongoose = require("mongoose");


const CategoriaSchema = new mongoose.Schema({

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
    sub_categoria:[{
        type: {
            nome: {
                type: String,
                required: true
            },
        
            descricao: {
                type: String,
                required: true
            }
        },
        required: false
    }],

},
{
    versionKey: false
})


module.exports = mongoose.model('Categoria', CategoriaSchema)
