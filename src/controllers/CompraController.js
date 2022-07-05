const Transacao = require("../models/Transacao");
const Entrega = require("../models/Entrega");
const Compra = require("../models/Compra");
const Anuncio = require("../models/Anuncio");
const { default: mongoose } = require("mongoose");


class CompraController  {

    /**
     * São dois corpos transacao e endereco
     *  @param { 
     * compra{
     *      comprador: id_usuario,
     *      data_limite: tipo data Formato(yyyy-mm-dd)
     *      forma_pagamento: Enum['cartao', 'boleto', 'pix', 'deposito']
     *      
     * }
     * 
     * anuncios[{
     *      id_anuncio: ,
     *      quantidade: Number
     * }]
     * 
     * endereco{
     *      rua: String,
     *      numero:  String,
     *      apt: String (opcional)
     *      cep: String,
     *      cidade: String,
     *      estado: String   
     * }
     * } req
     * 
     */

    async createCompra(req, res) { 
        let {compra, anuncios, endereco} = req.body;
        try{
            var transacaoArray = [], valorTotal = 0;
            let i = 0;
            for(i ; i< anuncios.length; i++){
                let anuncioCompra = anuncios[i];

                let id_anuncio = mongoose.Types.ObjectId(anuncioCompra.id_anuncio);
                let anuncio = await Anuncio
                    .findOne({_id: id_anuncio});

                let transacao = await Transacao.create({
                    comprador: compra.comprador,
                    vendedor: anuncio.autor,
                    anuncio: anuncio._id,
                    quantidade_prod: anuncios[i].quantidade,
                    valor_total: parseInt(anuncio.preco) * parseInt(anuncios[i].quantidade)
                });

                transacaoArray.push({transacao: transacao});

                valorTotal = parseInt(valorTotal) + parseInt(transacao.valor_total);
            }
            const newCompra = await Compra.create({
                comprador: compra.comprador,
                transacoes: transacaoArray,
                // data_limite: compra.data_limite,
                valor_total: valorTotal,
                forma_pagamento: compra.forma_pagamento
            });

            const newEntrega = await Entrega.create(
                {
                    comprador: compra.comprador,
                    compra: newCompra._id,
                    endereco: endereco
                });

            return res.status(200).json({compra: newCompra, entrega: newEntrega});
            
        }catch(err){
            return res.status(400).json(err);
        }
    }

    async getCompras(req, res) {
        try {
            const compras = await Compra.find();
            return res.status(200).json(compras)
        } catch(err){
            return res.status(400).json(err);
        }
    }
    
    async getCompraByID(req, res) {
        const  { id_compra }  = req.params
        try {
            const compra = await Compra.findById(id_compra)
            return res.status(200).json(compra)
        } catch(err){
            return res.status(400).json(err)
        }
    }
    
}

module.exports = new CompraController;