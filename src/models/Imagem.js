var mongoose = require('mongoose');
  
var imagemSchema = new mongoose.Schema({
    nome: String,
    // descricao: String,
    img:
    {
        data: Buffer,
        contextType: String
    }
},
{
    versionKey: false
});
  
//Image is a model which has a schema imageSchema
  
module.exports = imagemSchema;