const Usuario = require("../models/Usuario")
const JWTSecret = require("../middlewares/segredo");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


class UserController  {

    async createUser(req, res) {
        // let newUser = new Usuario();

        let usuario = req.body;
        
        

        try{
            var hash = await bcrypt.hash(usuario.senha, 10);

            let senha = hash;
            // const newUser = await Usuario.create(bodyData);
            const newUser = await Usuario.create({
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
            return res.status(200).json(newUser);
            
        }catch(err){
            return res.status(400).json(err);
        }
    }

    async getUser(req, res) {
        try {
            const users = await Usuario.find()
            return res.status(200).json(users)
        } catch(err){
            return res.status(400).json(err)
        }
    }
    
    async getUserByID(req, res) {
        const  { usuario_id }  = req.params
        try {
            const user = await Usuario.findById(usuario_id)
            return res.status(200).json(user)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async updateUserByID(req, res) {
        const bodyData = req.body
        const { usuario_id } = req.params

        
        try {
            const updateUsuario = await Usuario.findByIdAndUpdate(usuario_id, bodyData, {new: true})
            return res.status(200).json(updateUsuario)
        } catch(err) {
            return res.status(400).json(err)
        }

    }

    async login(req, res) {
        const { email, senha } = req.body;
        
        try{
            
            const user = await Usuario.findOne({email: email});

            if(user != undefined){
                
                let resultado = await bcrypt.compare(senha,user.senha);

                if(resultado == true){
                    let token = jwt.sign({ email: user.email, status: user.status}, JWTSecret)
                    return res.status(200).json({token: token});
                }else{
                    let msg = "Senha incorreta";
                    res.status(406).json(msg);
                }  
            }else{
                res.status(406);
                res.json({status: false, err: "Email incorreto ou inexistente!"});
            }
        } catch(err) {
            return res.status(400).json(err)
        }
    }

}

module.exports = new UserController;