const mongoose = require("mongoose");
const comentario = require("Comentario");

//Comentario
const Schema = new mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    id_usuario:{
        type: String,
        required: true
    },
    comentarios: {
        type: [comentario.Schema],
        required: false
    }
})


module.exports = mongoose.model('Topico', Schema)