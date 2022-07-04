const Carrinho = require("../models/Carrinho")
const Anuncio = require("../models/Anuncio");
const Usuario = require("../models/Usuario");
const { isObjectIdOrHexString, default: mongoose } = require("mongoose");
const { OrderedBulkOperation } = require("mongodb");

class CarrinhoController  {

    async getCarrinhos(req, res) {
        try {
            const carrinhos = await Carrinho.find();
            return res.status(200).json(carrinhos)
        } catch(err){
            return res.status(400).json(err)
        }
    }
    
    async getCarrinhoByIDUser(req, res) {
        const  { id_usuario }  = req.params
        try {
            const carrinho = await Carrinho.findOne({comprador: id_usuario});
            return res.status(200).json(carrinho)
        } catch(err){
            return res.status(400).json({erro: err, msg: "Carrinho vazio ou inexistente"})
        }
    }


    //coloca anuncio no carrinho
    async pushAnuncioCarrinho(req, res){
        let {id_usuario} = req.params;
        let {anuncios} = req.body;

        try{
            if(isObjectIdOrHexString(id_usuario) && isObjectIdOrHexString(anuncios)){

                let anuncio = await Anuncio.findOne({_id: anuncios});

                if(anuncio  == undefined){
                    return res.status(404).json({msg: 'Anuncio inexistente ou não encontrado'});
                }
                

                try{
                    
                    let carrinhoUpdate = await Carrinho.findOneAndUpdate
                                (
                                    {comprador: id_usuario}, 
                                    (
                                    {$push: {anuncios: {anuncio: anuncios}},
                                    $inc: {preco_total: + anuncio.preco}}
                                    ), {new: true}
                                );
                    
                    
                    if( carrinhoUpdate == undefined){
                        
                        const carrinhoObj = new Carrinho({
                            comprador: id_usuario, 
                            preco_total: anuncio.preco,
                            anuncios: [
                                {
                                   anuncio: anuncio 
                                }
                            ]
                        });
                        
                        const carrinho = await carrinhoObj.save();
                        

                        return res.status(200).json(carrinho);
                    }

                    return res.status(200).json(carrinhoUpdate);
                }catch(err){
                    return res.status(400).json(err);
                }
            }
            return res.status(400).json({msg: "Identificador de Usuário invalido"})
        }catch(err){
            return res.status(500).json(err);
        }
    }

    //retira anuncio do carrinho 
    async deleteAnuncioCarrinho(req, res){
        let {id_usuario, id_anuncio} = req.params;

        let anuncio = await Anuncio.findOne({_id: id_anuncio});

        if(anuncio  == undefined){
            return res.status(404).json({msg: 'Anuncio inexistente ou não encontrado'});
        }

        try{
            // let user_id = mongoose.Types.ObjectId(id_usuario);
            let deleteAnuncio = await Carrinho.findOneAndUpdate
                            (
                                {comprador: id_usuario}, 
                                (
                                {$pull: {anuncios: {anuncio: id_anuncio}},
                                $inc: {preco_total: - anuncio.preco}}
                                ), 
                                {new: true}
                            );
                            
            return res.status(200).json(deleteAnuncio);
        }catch(err){
            return res.status(400).json({erro: err, msg: ""});
        }
    }


    async deleteCarrinhoByUser(comprador){
        try{
            let deleteCarrinho = Carrinho.findOneAndDelete({comprador: comprador});
            return res.status(200).json(deleteCarrinho);
        }catch(err){
            return res.status(400).json(err);
        }
    }

}

module.exports = new CarrinhoController;