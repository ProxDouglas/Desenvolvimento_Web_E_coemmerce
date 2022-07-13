const Usuario = require("../models/Usuario")
const JWTSecret = require("../middlewares/segredo");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


class UserController  {

    async createUser(req, res) {
        let usuario = req.body;
        
        

        try{
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
                senha: senha,
                endereco: {
                    rua: usuario.endereco.rua,
                    numero: usuario.endereco.numero,
                    apt: usuario.endereco.apt,
                    cep: usuario.endereco.cep,
                    cidade: usuario.endereco.cidade,
                    estado: usuario.endereco.estado
                }
            });
            // #swagger.responses[201] = { description: 'Usuario registrado com Sucesso.' }
            return res.status(201).json(newUser);
            
        }catch(err){
            // #swagger.responses[400] = { description: 'Requisição Invalida.' }
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