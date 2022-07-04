const Entrega = require("../models/Entrega")

class EntregaController  {

    async createEntrega(req, res) { 
        let bodyData = req.body;
        try{
            const newEntrega = await Entrega.create(bodyData);
            return res.status(200).json(newEntrega);
            
        }catch(err){
            return res.status(400).json(err);
        }
    }

    async getEntregas(req, res) {
        try {
            const entregas = await Entrega.find();
            return res.status(200).json(entregas)
        } catch(err){
            return res.status(400).json(err);
        }
    }
    
    async getEntregaByID(req, res) {
        const  { id_entrega }  = req.params
        try {
            const entrega = await Entrega.findById(id_entrega)
            return res.status(200).json(entrega)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async getEntregaByTransacao(req, res) {
        const  { id_transacao }  = req.params
        try {
            const entrega = await Entrega.findOne({transacao: id_transacao})
            return res.status(200).json(entrega)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async updateEntregaByID(req, res) {
        const bodyData = req.body
        const { id_entrega } = req.params

        try {
            const updateEntrega = await Entrega.findByIdAndUpdate(id_entrega, bodyData, {new: true})
            return res.status(200).json(updateEntrega)
        } catch(err) {
            return res.status(400).json(err)
        }
    }

    async updateEntregaByTransacao(req, res) {
        const bodyData = req.body
        const { id_transacao } = req.params

        try {
            const updateEntrega = await Entrega.findOneAndUpdate({transacao: id_transacao}, bodyData, {new: true})
            return res.status(200).json(updateEntrega)
        } catch(err) {
            return res.status(400).json(err)
        }
    }
}

module.exports = new EntregaController;