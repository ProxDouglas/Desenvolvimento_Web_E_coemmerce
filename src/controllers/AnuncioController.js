const Anuncio  = require('../models/Anuncio');
const Usuario = require('../controllers/UserController/UserController');

class AnuncioController{

    async createAnuncio(req, res) {
        const dataAnu = req.body
        try{

            let newAnuncio = await Anuncio.create(dataAnu)
            await Usuario.pushAnuncio(newAnuncio.autor, newAnuncio._id);
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
        const  { id_anuncio }  = req.params
        try {
            const anuncio = await Anuncio.findById(id_anuncio)
            return res.status(200).json(anuncio)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async getAnuncioByUsuario(req, res) {
        const  { id_usuario }  = req.params
        try {
            const anuncios = await Anuncio.find({autor: id_usuario})
            return res.status(200).json(anuncios)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async getAnuncioByProduto(req, res) {//incompleto
        const  { id_produto }  = req.params
        try {
            const anuncios = await Anuncio.find({"autor":id_produto})
            return res.status(200).json(anuncios)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async updateAnuncioByID(req, res) {
        const bodyData = req.body
        const { id_anuncio } = req.params

        
        try {
            const updateAnuncio = await Anuncio.findOneAndUpdate(id_anuncio, bodyData, {new: true})
            return res.status(200).json(updateAnuncio)
        } catch(err) {
            return res.status(400).json(err)
        }

    }

}


module.exports = new AnuncioController();