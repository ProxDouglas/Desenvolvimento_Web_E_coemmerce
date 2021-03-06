const Anuncio  = require('../models/Anuncio');
const Usuario  = require('../models/Usuario');
const Produto = require('../models/Produto');

const mongoose = require('mongoose');

class AnuncioController{

    async createAnuncio(req, res) {
        const dataBody = req.body
        try{
            let usuario = findById(dataBody.autor).select('nome') 

            if(usuario != undefined){

                let newProduto = await Produto.create({
                    nome: dataBody.nome,
                    caracteristica: dataBody.caracteristica,
                    categoria: dataBody.categoria,
                    sub_categoria: dataBody.sub_categoria,
                    cadastrador: dataBody.autor
                });

                let newAnuncio = await Anuncio.create({
                    nome: dataBody.nome,
                    preco: dataBody.preco,
                    autor: dataBody.autor,
                    produto: newProduto._id,
                    estoque: dataBody.estoque
                });


                Usuario.findByIdAndUpdate(newAnuncio.autor, {$push: {anuncio: newAnuncio._id}});
                return res.status(200).json({anuncio: newAnuncio, produto: newProduto});
            }
            return res.status(400);
        }catch(err){
            return res.status(400).json(err)
        }
    }

    async getAnuncios(req, res) {
        try {
            const anunciosDB = await Anuncio.find();

            let anunciosFront = [];

            let i = 0;
            for(i; i< anunciosDB.length ; i++){
                let produto = await Produto.findById(anunciosDB[i].produto)
                    .select('caracteristica categoria sub_categoria');

                anunciosFront.push({
                    _id: anunciosDB[i]._id,
                    nome: anunciosDB[i].nome,
                    preco: anunciosDB[i].preco,
                    autor: anunciosDB[i].autor,
                    produto: anunciosDB[i].produto,
                    topico: anunciosDB[i].topico,
                    data: anunciosDB[i].data,
                    caracteristica: produto.caracteristica,
                    categoria: produto.categoria,
                    sub_categoria: produto.sub_categoria
                });
            }

            return res.status(200).json(anunciosFront)
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
            let anunciosFront = [];
            let i = 0;
            for(i; i< anunciosDB.length ; i++){
                let produto = await Produto.findById(anunciosDB[i].produto)
                    .select('caracteristica categoria sub_categoria');

                anunciosFront.push({
                    _id: anunciosDB[i]._id,
                    nome: anunciosDB[i].nome,
                    preco: anunciosDB[i].preco,
                    autor: anunciosDB[i].autor,
                    produto: anunciosDB[i].produto,
                    topico: anunciosDB[i].topico,
                    data: anunciosDB[i].data,
                    caracteristica: produto.caracteristica,
                    categoria: produto.categoria,
                    sub_categoria: produto.sub_categoria
                });
            }
            return res.status(200).json(anunciosFront)
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
            const updateAnuncio = await Anuncio.findOneAndUpdate({_id: id_anuncio}, bodyData, {new: true})
            return res.status(200).json(updateAnuncio)
        } catch(err) {
            return res.status(400).json(err)
        }
    }


    async deleteAnuncio(req, res){
        let {id_anuncio} = req.params;
        try{

            let anuncio = Anuncio.findById(id_anuncio);
            
            let usuario = await Usuario.findByIdAndUpdate(anuncio.autor, {$pull: {anuncio: [id_anuncio]}});


            let deleteAnuncio = await Anuncio.findByIdAndDelete(id_anuncio);
            res.status(200).json({anuncio: deleteAnuncio, usuario: usuario });
        }catch(err){
            res.status(400).json(err);
        }
    }

    async pushAvaliacao(req, res){
        let avaliacao = req.body;
        let {id_anuncio} = req.params;

        if(avaliacao.avaliador == id_anuncio){
            return res.status(400).json({Error: 'Anuncio n??o pode se avaliar'});
        }

        try{

            let anuncio = await Anuncio.findById(id_anuncio);

            this.pushAvaliacaoProduto(avaliacao, anuncio.produto.toString());

            if(anuncio != undefined){

                anuncio.avaliacao.push(
                    avaliacao 
                );
                await anuncio.save();
                return res.status(201).json(anuncio);
            }
            return res.status(404).json({Error: 'Anuncio inexistente no banco'});
        }catch(err){
            return res.status(400).json(err);
        }
    }

    async pushAvaliacaoProduto(avaliacao, id_produto){

        try{
            let produto = await Produto.findById(id_anuncio);

            if(produto != undefined){

                produto.avaliacao.push(
                    avaliacao 
                );
                await produto.save();
            }
        }catch(err){
            console.log(err);
        }
    }

    async avaliacaoByIdAnuncio(req, res){
        let {id_anuncio} = req.params;
        let media, soma = parseFloat(0); 

        try{
            let anuncio = await anuncio.findById(id_anuncio);

            if(anuncio != undefined && anuncio.avaliacao.length > 0){
                
                let i = 0;
                for(i; i < anuncio.avaliacao.length; i++){
                    soma = soma + parseFloat(anuncio.avaliacao[i].nota);
                }

                media = soma/parseFloat(usuario.avaliacao.length);

                return res.status(200).json({media: media});
            }
            return res.status(404).json({Error: 'Anuncio n??o encontrado'});

        }catch(err){
            return res.status(400).json(err);
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
            
            return res.status(400).json("Topico n??o existe");
        }catch{
            return res.status(400).json(err);
        }
    }

    async deleteTopico(req, res){
        let {id_anuncio, id_topico} = req.params
        if(isObjectIdOrHexString(id_anuncio) && isObjectIdOrHexString(id_topico)){

            try
            {
                
                let anuncio = await Anuncio.findById(id_anuncio);
                if(anuncio != undefined){

                    anuncio.topico.id(id_topico).remove();

                    let deletar = await anuncio.save();
                    return res.status(200).json(deletar);
                }
                // #swagger.responses[404] = { description: 'Anuncio n??o encontrado' }
                return res.status(404).json('Error: Anuncio n??o encontrado');

            }catch(err){
                return res.status(400).json(err);
            }
        }
        // #swagger.responses[400] = { description: 'id de anuncio ou topico Invalido' }
        return res.status(400).json('Erro: id de anuncio ou topico Invalido');
    }

    async pushComentario(req, res){
        let {id_anuncio, id_topico} = req.params;
        let {texto, autor, data} = req.body;

        if(isObjectIdOrHexString(id_anuncio) && isObjectIdOrHexString(id_topico)){
            try
            { 
                let anuncio = await Anuncio.findById(id_anuncio);
                if(anunccio != undefined){
                    anuncio.topico.id(id_topico).comentario.push({
                        texto: texto,
                        autor: autor,
                        data: data instanceof Date
                    });

                    let push = await anuncio.save();
                    return res.status(200).json(push.topico.comentario);
                }
                // #swagger.responses[404] = { description: 'Anuncio n??o encontrado' }
                return res.status(404).json('Error: Anuncio n??o encontrado');
            }catch(err){
                assert.equal(err.errors['texto'].message,
                'O campo `texto` ?? obrigat??rio.');

                assert.equal(err.errors['autor'].message,
                'O campo `autor` ?? obrigat??rio.');

                assert.equal(err.errors['data'].message,
                'O campo `data` ?? obrigat??rio.');

                return res.status(400).json(err);
            }
        }

        // #swagger.responses[400] = { description: 'id de anuncio ou topico Invalido' }
        return res.status(400).json('Erro: id de anuncio ou topico Invalido');
    }


    async editComentario(req, res){
        let {id_anuncio, id_topico, id_comentario} = req.params;
        let {texto} = req.body;

        if(isObjectIdOrHexString(id_anuncio) && isObjectIdOrHexString(id_topico) && isObjectIdOrHexString(id_comentario)){
            try
            { 
                
                let anuncio = await Anuncio.findById(id_anuncio);
                if(anuncio != undefined){

                    anuncio.topico.id(id_topico)
                        .comentario(id_comentario).texto = texto;

                    let push = await anuncio.save();
                    return res.status(200).json(push.topico.comentario);
                }
                // #swagger.responses[404] = { description: 'Anuncio n??o encontrado' }
                return res.status(404).json('Error: Anuncio n??o encontrado');
            }catch(err){
                assert.equal(err.errors['texto'].message,
                'O campo `texto` ?? obrigat??rio.');
                // #swagger.responses[400] = { description: 'Requisi????o n??o aceita pelo padr??o' }
                return res.status(400).json(err);
            }
        }
        // #swagger.responses[400] = { description: 'id de anuncio, topico ou comentario Invalido' }
        return res.status(400).json('Erro: id de anuncio, topico ou comentario Invalido');
    }

    async deleteComentario(req, res){
        let {id_anuncio, id_topico, id_comentario} = req.params;

        if(isObjectIdOrHexString(id_anuncio) && isObjectIdOrHexString(id_topico) && isObjectIdOrHexString(id_comentario)){
            try
            { 
                let anuncio = await Anuncio.findById(id_anuncio);

                anuncio.topico.id(id_topico)
                    .comentario(id_comentario).remove();

                let deletar = await anuncio.save();
                // #swagger.responses[200] = { description: 'Objeto Comentario' }
                return res.status(200).json(deletar.topico.comentario);

            }catch(err){
                // #swagger.responses[404] = { description: 'comentario n??o encontrado' }
                return res.status(404).json('Erro: comentario n??o encontrado');
            }
        }
        // #swagger.responses[400] = { description: 'id de anuncio, topico ou comentario Invalido' }
        return res.status(400).json('Erro: id de anuncio, topico ou comentario Invalido');
    }

    async getComentarios(req, res){
        let {id_anuncio, id_topico} = req.params;

        if(isObjectIdOrHexString(id_anuncio) && isObjectIdOrHexString(id_topico) ){
            try {
                const anuncio = await Anuncio.findOne( {_id: id_anuncio});

                let comentarios = anuncio.topico.id(id_topico).comentario;

                // #swagger.responses[200] = { description: 'Objeto Comentario' }
                return res.status(200).json(comentarios);
            } catch(err){
                // #swagger.responses[404] = { description: 'Sem comentarios' }
                return res.status(404).json(err);
            }
        }
        // #swagger.responses[400] = { description: 'id de anuncio ou topico Invalido' }
        return res.status(400).json('Erro: id de anuncio, topico ou comentario Invalido');
    }

    async getComentarioById(req, res){
        let {id_anuncio, id_topico, id_comentario} = req.params;

        if(isObjectIdOrHexString(id_anuncio) && isObjectIdOrHexString(id_topico) && isObjectIdOrHexString(id_comentario)){

            try {
                const anuncio = await Anuncio.findOne( {_id: id_anuncio});

                let comentario = anuncio.topico.id(id_topico).comentario.id(id_comentario);

                // #swagger.responses[200] = { description: 'Objeto Comentario' }
                return res.status(200).json(comentario);
            } catch(err){
                // #swagger.responses[404] = { description: 'comentario n??o encontrado' }
                return res.status(404).json(err);
            }
        }
        // #swagger.responses[400] = { description: 'id de anuncio, topico ou comentario Invalido' }
        return res.status(400).json('Erro: id de anuncio, topico ou comentario Invalido');
    }



}


module.exports = new AnuncioController();
