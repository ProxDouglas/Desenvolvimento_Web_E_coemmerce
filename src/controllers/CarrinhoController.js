const Carrinho = require("../models/Carrinho")
const Anuncio = require("../models/Anuncio");
const Usuario = require("../models/Usuario");
const { isObjectIdOrHexString } = require("mongoose");

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

        if(isObjectIdOrHexString(id_usuario) && isObjectIdOrHexString(anuncios)){

            let existe = await this.existeCarrinho(id_usuario);

            if( existe == false){
              this.createCarrinho(id_usuario);  
            }

            let anuncio = await this.getPrecoAnuncio(id_anuncio);

            if(anuncio  == undefined){
                return res.status(404).json({msg: 'Anuncio inexistente ou não encontrado'});
            }

            try{
                let pushAnuncio = await Carrinho.findOneAndUpdate
                                                (
                                                    {comprador: id_usuario}, 
                                                    {$push: {anuncios: id_anuncio}},
                                                    {$inc: {preco_total: anuncio.preco}}
                                                );
                return res.status(200).json(pushAnuncio);
            }catch(err){
                return res.status(400).json(err);
            }
        }
        return res.status(400).json({msg: "Identificador de Usuário invalido"})
    }

    //retira anuncio do carrinho 
    async deleteAnuncioCarrinho(req, res){
        let {id_carrinho, id_anuncio} = req.params;

        let anuncio = await this.getPrecoAnuncio(id_anuncio);

        if(anuncio  == undefined){
            return res.status(404).json({msg: 'Anuncio inexistente ou não encontrado'});
        }

        try{
            let pushAnuncio = await Carrinho.findByIdAndUpdate
                                            (
                                                id_carrinho, 
                                                {$pull: {anuncios: id_anuncio}}, 
                                                {$inc: {preco_total: -anuncio.preco}}
                                            );
            return res.status(200).json(pushAnuncio);
        }catch(err){
            return res.status(400).json({erro: err, msg: ""});
        }
    }

    async getPrecoAnuncio(id_anuncio){
        try{
            return await Anuncio.findById(id_anuncio);
        }catch(err){
            return res.status(err).json('Erro na operação');
        }
    }

    async existeCarrinho(comprador){

        let usuario = await Usuario.findOne({_di: comprador});
        if(usuario != undefined){
            let existCarrinho = await Carrinho.findOne({comprador: comprador});
                if(existCarrinho != undefined){
                    return true;
                }
                return false;
        }
        return false;
    }

    async createCarrinho(comprador) {
        try{
            let newCarrinho = await Carrinho.create({comprador: comprador});
            return res.status(200).json(newCarrinho);
        }catch(err){
            return res.status(400).json(err);
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