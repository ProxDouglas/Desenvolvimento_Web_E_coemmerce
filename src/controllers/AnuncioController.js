const Anuncio  = require('../models/Anuncio');
const Usuario  = require('../models/Usuario');

const mongoose = require('mongoose');

class AnuncioController{

    async createAnuncio(req, res) {
        const dataAnu = req.body
        try{

            let newAnuncio = await Anuncio.create(dataAnu)
            let pushAnuncio = await Usuario.findByIdAndUpdate(newAnuncio.autor, {$push: {anuncio: newAnuncio._id}});
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


    async deleteAnuncio(req, res){
        let {id_anuncio} = req.params;
        try{

            let anuncio = Anuncio.findById(id_anuncio);
            
            let usuario = await Usuario.findByIdAndUpdate(anuncio.autor, {$pull: {anuncio: [id_anuObj]}});


            let deleteAnuncio = await Anuncio.findByIdAndDelete(id_anuncio);
            res.status(200).json({anuncio: deleteAnuncio, usuario: usuario });
        }catch(err){
            res.status(400).json(err);
        }
    }


    async pushTopico(req, res){
        let dataTopico = req.body;
        let {id_anuncio} = req.params;

        try{
            let pushTopico = await Anuncio.
                findOneAndUpdate(
                    id_anuncio, 
                    {$push: {topico: dataTopico}}, 
                    {new: true}
                    );
            return res.status(200).json(pushTopico);
        }catch(err){
            return res.status(400).json(err);
        }
    }

    async getTopicos(req, res){
        let {id_anuncio} = req.params;
        let objId = mongoose.Types.ObjectId(id_anuncio);
        try {
            const anuncios = await Anuncio.find( {_id: objId}, 'topico');
            return res.status(200).json(anuncios)
        } catch(err){
            return res.status(400).json(err)
        }
    }


    async getTopico(req, res){
        let {id_anuncio, id_topico} = req.params;
        try
        {
            let anuncio = await Anuncio.findById(id_anuncio);

            let topico = await anuncio.topico.id(id_topico);
            
            return res.status(200).json(topico)
        }catch{
            return res.status(400).json(err);
        }
    }



    async editTopico(req, res){
        let {id_anuncio, id_topico} = req.params
        let {texto} = req.body;
        try
        {
            if(texto != undefined && texto != "" && texto != " "){
                let anuncio = await Anuncio.findById(id_anuncio);

                anuncio.topico.id(id_topico).texto = texto;

                let update = await anuncio.save();
                return res.status(200).json(update);
            }
            
            return res.status(400).json("Topico não existe");
        }catch{
            return res.status(400).json(err);
        }
    }

    async deleteTopico(req, res){
        let {id_anuncio, id_topico} = req.params
        try
        {
            
            let anuncio = await Anuncio.findById(id_anuncio);

            anuncio.topico.id(id_topico).remove();

            let deletar = await anuncio.save();
            return res.status(200).json(deletar);

        }catch{
            return res.status(400).json(err);
        }
    }
}


module.exports = new AnuncioController();


/**
 * deletar anuncio
 * 
 */