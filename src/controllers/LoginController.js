const AuthGoogle = require('../middlewares/AuthGoogle');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const JWTSecret = require("../middlewares/segredo");
const Usuario = require('../models/Usuario'); 


class LoginController {



    async alterToken(req, res){
        const  token  = req.params['token'];
        // const  authToken  = req.headers['authorization'];
        
        if(token != undefined){
            // const bearer = authToken.split(' ');
            // var token = bearer[1];

            let googleUser = await AuthGoogle.verify(token);
            //AuthGoogle.verify().catch(console.error);

            if(googleUser['sub'] != undefined){
                let valid = await AuthGoogle.verifyIdToken(token);

                if(valid){
                    let usuario = await Usuario.findOne({id_google: googleUser['sub']});

                    if(usuario == undefined){
                        usuario = await Usuario.create({
                            id_google: googleUser['sub'],
                            email: googleUser['email'],
                            nome: googleUser['nome'],
                            avatar: {
                                data: googleUser['picture'],
                                contentType: String
                            }
                        });
                        
                    }

                    let newtoken = jwt.sign({ email: usuario.email, nome: usuario.nome}, JWTSecret, {expiresIn: '2h'})
                    return res.status(200).json({token: 'Bearer '+ newtoken, id: usuario._id, nome: usuario.nome, email: usuario.email});
                }
            }
        }
    }


    async login(req, res) {
        const { email, senha } = req.body;
        
        // console.log("email: " + email + " senha: " + senha);
        try{
            
            const user = await Usuario.findOne({email: email});

            if(user != undefined){
                
                let resultado = await bcrypt.compare(senha,user.senha);

                if(resultado == true){
                    let token = jwt.sign({ email: user.email, nome: user.nome}, JWTSecret, {expiresIn: '2h'})
                    
                    return res.status(200).json({token: 'Bearer '+ token, id: user._id, nome: user.nome, email: user.email});
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



module.exports = new LoginController;