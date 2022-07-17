const Usuario = require("../models/Usuario");
const Anuncio = require("../models/Anuncio");

const bcrypt = require("bcrypt");




class UserController  {

    async createUser(req, res) {
        let usuario = req.body;
        
        try{

            let existUser = await Usuario.findOne({email: usuario.email});
            if(existUser != undefined){
                var hash = await bcrypt.hash(usuario.senha, 10);

                let senha = hash;
                // const newUser = await Usuario.create(bodyData);
                const newUser = await Usuario.create(
                    {
                    nome: usuario.nome,
                    email: usuario.email,
                    data_nascimento:usuario.data_nascimento,
                    cpf: usuario.cpf,
                    telefone: usuario.telefone,
                    senha: senha
                });

                await this.pushEndereco(usuario.endereco, newUser._id.toString());

                // #swagger.responses[201] = { description: 'Usuario registrado com Sucesso.' }
                return res.status(201).json(newUser);
            }
            // #swagger.responses[400] = { description: 'Email já cadastrado.' }
            return res.status(400).json('Error: Email já cadastrado');
            
        }catch(err){
            // #swagger.responses[400] = { description: 'Requisição Invalida.' }
            return res.status(400).json(err);
        }
    }

    async addEndereco(req, res){
        let { endereco } = req.body;
        let {id_usuario} = req.params;

        let adress = await this.pushEndereco(endereco, id_usuario);

        let code = 400;
        if(adress.rua  != undefined){
            code = 201;
        }

        return res.status(code).json(adress);
    }


    async pushEndereco(endereco, id_usuario) {
        try{
            let usuario = await Usuario.findOne({_id: id_usuario});

            usuario.endereco.push({
                rua: endereco.rua,
                numero: endereco.numero,
                apt: endereco.apt,
                cep: endereco.cep,
                cidade: endereco.cidade,
                estado: endereco.estado
            });

            usuario.save();

            return usuario.endereco;

        }catch(err){
            return err;
        }
    }

    async pushAvaliacao(req, res){
        let avaliacao = req.body;
        let {id_usuario} = req.params;

        if(avaliacao.avaliador == id_usuario){
            return res.status(400).json({Error: 'Usuario não pode se avaliar'});
        }

        try{

            let usuario = await Usuario.findById(id_usuario);

            if(usuario != undefined){

                usuario.avaliacao.push(
                    avaliacao 
                );
                await usuario.save();
                return res.status(201).json(usuario.avaliacao[parseInt(usuario.avaliacao) - parseInt(1)]);
            }
            return res.status(404).json({Error: 'Usuario inexistente no banco'});
        }catch(err){
            return res.status(400).json(err);
        }
    }

    async avaliacaoByIdUsuario(req, res){
        let {id_usuario} = req.params;
        let media, soma = parseFloat(0); 

        try{
            let usuario = await Usuario.findById(id_usuario);

            if(usuario != undefined && usuario.avaliacao.length > 0){
                
                let i = 0;
                for(i; i < usuario.avaliacao.length; i++){
                    soma = soma + parseFloat(usuario.avaliacao[i].nota);
                }

                media = soma/parseFloat(usuario.avaliacao.length);

                return res.status(200).json({media: media});
            }
            return res.status(404).json({Error: 'Usuario não encontrado'});

        }catch(err){
            return res.status(400).json(err);
        }
    }



    async getUser(req, res) {
        try {
            const users = await Usuario.find()
                .select('_id nome email data_nascimento cpf telefone endereco');
            return res.status(200).json(users)
        } catch(err){
            return res.status(400).json(err)
        }
    }
    
    async getUserByID(req, res) {
        const  { usuario_id }  = req.params
        try {
            const user = await Usuario.findById(usuario_id)
                .select('_id nome email data_nascimento cpf telefone endereco');
            return res.status(200).json(user)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async updateUserByID(req, res) {
        const usuario = req.body
        const { id_usuario } = req.params

        
        try {
            const updateUsuario = await Usuario
                .findByIdAndUpdate(
                    id_usuario,

                    {
                        nome: usuario.nome,
                        // email: usuario.email,
                        data_nascimento:usuario.data_nascimento,
                        cpf: usuario.cpf,
                        telefone: usuario.telefone,
                        endereco: {
                            rua: usuario.endereco.rua,
                            numero: usuario.endereco.numero,
                            apt: usuario.endereco.apt,
                            cep: usuario.endereco.cep,
                            cidade: usuario.endereco.cidade,
                            estado: usuario.endereco.estado
                        }
                    }, 

                    {new: true}
                    )
            return res.status(200).json(updateUsuario)
        } catch(err) {
            return res.status(400).json(err)
        }
    }

    async addAvatar(req, res){
        let {id_usuario} = req.params;

        let arqNome = req.file.originalname.toString().split;
        let extensao = arqNome[1];

        try{

            let usuario = await Usuario.findById(id_usuario);

            console.log(usuario.nome);

            usuario.avatar = {
                                nome: req.file.originalname,
                                img: {
                                    data: req.file.buffer,
                                    contentType: 'image/' + extensao
                                }
                            }

            usuario.save();

            console.log(usuario.avatar.nome);

            return res.status(201).json('Foto adicionada');
        }catch(err){
            return res.status(400).json(err);
        }
    }

    async getAvatar(req, res){
        let {id_usuario} = req.params;

        try{
            let usuario = await Usuario.findById(id_usuario);

            console.log(usuario.nome);
            if(usuario.avatar != undefined){
                return res.status(200).json(usuario.avatar);
            }
            return res.status(404).json({Error: 'foto não encontrada'});

        }catch(err){
            return res.status(400);
        }

    }

    async pushFavorito(req, res){
        let {id_anuncio} = req.body;
        let {id_usuario} = req.params;

        try{

            let usuario = await Usuario.findById(id_usuario);

            if(usuario != undefined){

                let favoritos = usuario.favoritos;

                let existe = false;
                let i = 0;
                while(i<favoritos.length && existe == false){
                    if(id_anuncio == favoritos[i].toString()){
                        existe = true;
                    }
                    i++;
                }

                if(existe == false){
                    usuario.favoritos.push(
                        id_anuncio 
                    );
                    await usuario.save();
                    return res.status(201).json(usuario.favoritos);
                }
                res.status(400).json({Error: 'Anuncio já está em favoritos'});
            }
            return res.status(404).json({Error: 'Usuario inexistente no banco'});
        }catch(err){
            return res.status(400).json(err);
        }
    }

    async getFavoritos(req, res){
        let {id_usuario} = req.params;

        try{
            let favoritos = await Usuario.findById(id_usuario).select('favoritos');

            if(favoritos.lenght > 0 && favoritos != undefined){
                let anuncios = [];
                let i = 0;
                for(i; i< favoritos.length; i++){

                    let anuncio = await Anuncio.findById(favoritos[i]);
                    anuncios.push(anuncio);
                }
                return res.status(200).json(anuncios);
            }

            return res.status(404).json({Error: 'Usuario não encontrado'});


        }catch(err){

        }

    }

}

module.exports = new UserController;