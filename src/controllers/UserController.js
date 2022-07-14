const Usuario = require("../models/Usuario")
const JWTSecret = require("../middlewares/segredo");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


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
            let usuario = Usuario.findById(id_usuario);

            if(usuario != undefined){

                usuario.avaliacao.push({
                    avaliador: avaliacao.avaliador,
                    nota: avaliacao.nota
                });
                usuario.save();
                return res.status(201).json(usuario);
            }
            return res.status(404).json({Error: 'Usuario inexistente no banco'});
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
        const { usuario_id } = req.params

        
        try {
            const updateUsuario = await Usuario
                .findByIdAndUpdate(
                    usuario_id,

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



}

module.exports = new UserController;