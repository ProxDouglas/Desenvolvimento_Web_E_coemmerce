const mongoose = require("mongoose");

//Comentario
const Schema = new mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    id_usuario:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Comentario', Schema)