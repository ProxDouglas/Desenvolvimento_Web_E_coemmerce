const Carrinho = require("../models/Carrinho")
const Anuncio = require("../models/Anuncio");
const Usuario = require("../models/Usuario");
const { isObjectIdOrHexString, default: mongoose } = require("mongoose");


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

            let i = 0;
            let listAnuncios = [];
            for(i; i < carrinho.anuncios.length; i++){
                let id = carrinho.anuncios[i].anuncio.toString();
                let anuncio = await Anuncio.findById(id);
                console.lo
                listAnuncios.push(anuncio);
            }

            

                return res.status(200).json({
                    _id: carrinho._id, 
                    comprador: carrinho.comprador,
                    anuncios: listAnuncios,
                    preco_total: carrinho.preco_total
                });
        } catch(err){
            return res.status(400).json({erro: err, msg: "Carrinho vazio ou inexistente"})
        }
    }


    //coloca anuncio no carrinho
    async pushAnuncioCarrinho(req, res){
        let {id_usuario} = req.params;
        let anuncios = req.body;

        try{
            if(isObjectIdOrHexString(id_usuario) && isObjectIdOrHexString(anuncios.anuncio)){
            

                let anuncio = await Anuncio.findOne({_id: anuncios.anuncio});

                if(anuncio  == undefined){
                    return res.status(404).json({msg: 'Anuncio inexistente ou não encontrado'});


                }else if(anuncio != undefined){

                    try{
                        

                        let existanuncio = []; 
                        let carrinhoPossui = await Carrinho.findOne({comprador: id_usuario});

                        if(carrinhoPossui != null){
                            let existanuncios = carrinhoPossui.anuncios;
                                // console.log(existanuncios)

                                
                               
                            existanuncio = await existanuncios.filter(obj =>  {
                                    return obj.anuncio.toString() == anuncios.anuncio
                            });
                        }

                        
                        if(existanuncio.length > 0){
                            
                            

                            let carQTD = parseInt(carrinhoPossui.anuncios.id(existanuncio[0]._id).quantidade);
                            let carPreco = parseFloat(carrinhoPossui.preco_total);

                            if(carQTD > parseInt(anuncios.quantidade)){
                                let qtd = carQTD - parseInt(anuncios.quantidade);
                                let preco = parseFloat(anuncio.preco) * qtd;

                                carrinhoPossui
                                    .preco_total = carPreco - parseFloat(preco);

                            }else if(carQTD < anuncios.quantidade){

                                let qtd = parseInt(anuncios.quantidade) - carQTD;
                                let preco = parseFloat(anuncio.preco) * qtd;

                                carrinhoPossui
                                    .preco_total = carPreco + parseFloat(preco);
                            }

                            carrinhoPossui.anuncios.id(existanuncio[0]._id).quantidade = anuncios.quantidade;

                            let update = await carrinhoPossui.save();

                            return res.status(200).json(update);



                        }else {
                        
                            
                            let preco = parseFloat(anuncio.preco) * parseInt(anuncios.quantidade);
                            console.log('teste2')
                            let carrinhoUpdate = await Carrinho.findOneAndUpdate
                                        (
                                            {comprador: id_usuario}, 
                                            (
                                            {$push: {anuncios:  anuncios},
                                            $inc: {preco_total: + preco}}
                                            ), {new: true}
                                        );
                            
                            console.log('Aqui');
                            if( carrinhoUpdate == undefined){
                                const carrinhoObj = new Carrinho({
                                    comprador: id_usuario, 
                                    preco_total: preco,
                                    anuncios: [
                                        {
                                        anuncio: anuncios.anuncio,
                                        quantidade: anuncios.quantidade 
                                        }
                                    ]
                                });
                                
                                const carrinho = await carrinhoObj.save();

                                let i = 0;
                                let listAnuncios = [];
                                for(i; i < carrinho.anuncios.length; i++){
                                    let id = carrinho.anuncios[i].anuncio.toString();
                                    let anuncio = await Anuncio.findById(id);
                                    listAnuncios.push(anuncio);
                                }
                                

                                return res.status(200).json({
                                    _id: carrinho._id, 
                                    comprador: carrinho.comprador,
                                    anuncios: listAnuncios,
                                    preco_total: carrinho.preco_total
                                });
                            }

                            let i = 0;
                            let listAnuncios = [];
                            for(i; i < carrinhoUpdate.anuncios.length; i++){
                                let id = carrinhoUpdate.anuncios[i].anuncio.toString();
                                let anuncio = await Anuncio.findById(id);
                                console.lo
                                listAnuncios.push(anuncio);
                            }



                            return res.status(200).json({
                                _id: carrinhoUpdate._id, 
                                comprador: carrinhoUpdate.comprador,
                                anuncios: listAnuncios,
                                preco_total: carrinhoUpdate.preco_total
                            });
                        }

                    }catch(err){
                        return res.status(400).json(err);
                    }
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