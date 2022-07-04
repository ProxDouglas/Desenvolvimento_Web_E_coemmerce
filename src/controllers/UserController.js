const Usuario = require("../models/Usuario")
const JWTSecret = require("../middlewares/segredo");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


class UserController  {

    async createUser(req, res) {
        let bodyData = req.body;
        try{
            var hash = await bcrypt.hash(bodyData.senha, 10);

            bodyData.senha = hash;
            const newUser = await Usuario.create(bodyData);
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

    async pushAnuncio(id_usuario, id_anuncio){

        try{
            let pushAnuncio = await Usuario.findByIdAndUpdate(id_usuario, {$push: {anuncio: id_anuncio}});
            return pushAnuncio;
        }catch(err){
            return err;
        }
    }

    async deleteAnuncio(id_usuario, id_anuncio){

        try{
            let pushAnuncio = await Usuario.findByIdAndUpdate(id_usuario, {$pull: {anuncio: id_anuncio}});
            return pushAnuncio;
        }catch(err){
            return err;
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