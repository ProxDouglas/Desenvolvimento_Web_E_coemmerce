const Transacao = require("../models/Transacao");
const Entrega = require("../models/Entrega");
const Compra = require("../LogicBusiness.js/Compra");


class TransacaoController  {

    /**
     * São dois corpos transacao e endereco
     *  @param { 
     * transacao{
     *      comprador: id_usuario,
     *      vendedor: id_usuario,
     *      anuncio: id_usuario,
     *      data_limite: tipo data Formato(yyyy-mm-dd)
     *      valor_total: Number
     *      frete: Number,
     *      forma_pagamento: Enum['cartao', 'Boleto', 'Pix', 'Deposito']
     *      
     * }
     * 
     * endereco{
     *      rua: String,
     *      number:  String,
     *      apt: String (opcional)
     *      cep: String,
     *      cidade: String,
     *      estado: String   
     * }
     * } req
     * 
     */

    async createTransacao(req, res) { 
        let {transacao, endereco} = req.body;
        try{
            const newTransacao = await Transacao.create(transacao);
            const newEntrega = await Entrega.create(
                {
                    comprador: newTransacao.comprador,
                    transacao: newTransacao._id,
                    endereco: endereco
                });

            return res.status(200).json({transacao: newTransacao, entrega: newEntrega});
            
        }catch(err){
            return res.status(400).json(err);
        }
    }

    async getTransacaos(req, res) {
        try {
            const transacoes = await Transacao.find();
            return res.status(200).json(transacoes)
        } catch(err){
            return res.status(400).json(err);
        }
    }
    
    async getTransacaoByID(req, res) {
        const  { id_transacao }  = req.params
        try {
            const transacao = await Transacao.findById(id_transacao)
            return res.status(200).json(transacao)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    //só da para mudar o status da transacao
    /**
     * 
     * @param {
     *  pagamento_status: Enum ['esperando', 'pago', 'cancelado']
     * } req 
     * @param {*} res 
     * @returns 
     */
    async updateTransacaoByID(req, res) {
        const {pagamento_status} = req.body
        const { id_transacao } = req.params

            try {
                const updateTransacao = await Transacao.findByIdAndUpdate(id_transacao, {pagamento_status: pagamento_status}, {new: true});

                return res.status(200).json(updateTransacao)
            } catch(err) {
                return res.status(400).json(err)
            }
    }

    
}

module.exports = new TransacaoController;