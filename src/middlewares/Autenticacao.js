const jwt = require("jsonwebtoken");
const JWTSecret = require("../middlewares/segredo");


function auth(req, res, next){
    const  authToken  = req.headers['authorization'];
    
    
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

    try{
        var decoded = jwt.verify(token, JWTSecret);
        
        // if(decoded.status == true){  //para acionar esse if é necessário verificar se usuario está ativo
            next();
        // }else{
        //     res.status(403);
        //     res.send("Usuario inativo!");
        //     return;
        // }
    }catch(err){
        res.status(403);
        res.send("Você não está autenticado");
        return;
    }
    }else{
        res.status(403);
        res.send("Você não está autenticado");
        return;
    }
    
}

module.exports = auth;