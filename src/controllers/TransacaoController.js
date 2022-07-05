const Transacao = require("../models/Transacao");
const Entrega = require("../models/Entrega");
const Compra = require("../LogicBusiness.js/Compra");


class TransacaoController  {

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