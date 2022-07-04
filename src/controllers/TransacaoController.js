const Transacao = require("../models/Transacao");
const Entrega = require("../models/Entrega");


class TransacaoController  {

    async createTransacao(req, res) { 
        let bodyData = req.body;
        try{
            const newTransacao = await Transacao.create(bodyData);
            return res.status(200).json(newTransacao);
            
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

        // if(pagamento_status != undefined){
        //     if(pagamento_status == true){
        //         //
        //     }

            try {
                const updateTransacao = await Transacao.findByIdAndUpdate(id_transacao, {pagamento_status: pagamento_status}, {new: true})
                return res.status(200).json(updateTransacao)
            } catch(err) {
                return res.status(400).json(err)
            }
        // }
        // res.status(400).json("Status de pagamento invalido");
    }


    // async efetuarPagamento(){

    //     try{

    //         let entrega = Entrega.findOne({transacao: id_transacao});

    //     }catch(err){

    //     }

    // }

    
}

module.exports = new TransacaoController;