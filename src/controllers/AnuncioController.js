const Anuncio  = require('../models/Anuncio');

class AnuncioController{

    async createAnuncio(req, res) {
        const bodyData = req.body
        try{

            let newAnuncio = await Anuncio.create(bodyData)
            return res.status(200).json(newAnuncio)
            
        }catch(err){
            return res.status(400).json(err)
        }
    }

    async getAnuncios(req, res) {
        try {
            const anuncios = await Anuncio.find()
            return res.status(200).json(anuncios)
        } catch(err){
            return res.status(400).json(err)
        }
    }
    
    async getAnuncioByID(req, res) {
        const  { id_Anuncio }  = req.params
        try {
            const anuncio = await Anuncio.findById(id_Anuncio)
            return res.status(200).json(anuncio)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async updateUserByID(req, res) {
        const bodyData = req.body
        const { id_anuncio } = req.params

        
        try {
            const updateAnuncio = await Usuario.findByIdAndUpdate(id_anuncio, bodyData)
            return res.status(200).json(updateAnuncio)
        } catch(err) {
            return res.status(400).json(err)
        }

    }

}


module.exports = new AnuncioController();