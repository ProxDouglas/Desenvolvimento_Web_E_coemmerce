const { Router } = require("express");


const UserController = require("../controllers/UserController/UserController");
//const { createUser } = require("../controllers/UserController/UserController");
const routes = Router()


// Criar Sessão/Login
routes.post("/login")
//---------------USUÁRIO--------------------------------
// Criar Usuário OK
routes.post("/usuario", UserController.createUser);
// Atualizar Usuário
routes.put("/usuario/:usuario_id", UserController.updateUserByID);
// Atualizar saldo do usuário
routes.put("/usuario/:usuario_id/saldo", (req, res) => {
    res.statusCode(200)
})
// Listar todos os usuários OK
routes.get("/usuarios", UserController.getUser)
// Listar apenas um usuário pelo ID
routes.get("/usuario/:usuario_id", UserController.getUserByID)


//---------------PRODUTO--------------------------------------------------------
// Criar novo produto na base de dados
routes.post("/produto", (req, res) => {
    res.statusCode(200)
})
// Atualizar produto na base de dados
routes.put("/produto", (req, res) => {
    res.statusCode(200)
})
// Excluir Produtos da base de dados
routes.delete("/produto/:produto_id", (req, res) => {
    res.statusCode(200)
})
// Listar todos os produtos da base de dados
routes.get("/produtos", (req, res) => {
    res.statusCode(200)
})
// Listar apenas um produto pelo ID
routes.get("/produto/:produto_id", (req, res) => {
    res.statusCode(200)
})

//------------ANUNCIO DO PRODUTO -------------------------
// Criar anúncio
routes.post("/anuncio/:usuario_id",  (req, res) => {
    res.statusCode(200)
})
// Atualizar informações do anúncio
routes.put("/anuncio/:usuario_id", (req, res) => {
    res.statusCode(200)
})
// Excluir anuncio de um determinado usuario
routes.delete("/anuncio/:anuncio_id", (req, res) => {
    res.statusCode(200)
})
// Excluir anuncio pelo ID
routes.delete("/anuncio/:usuario_id", (req, res) => {
    res.statusCode(200)
})
// Listar todos os anúncios
routes.get("/anuncio", (req, res) => {
    res.statusCode(200)
})
// Listar os anuncios de determinado usuário
routes.get("/anuncio/:usuario_id", (req, res) => {
    res.statusCode(200)
})
// Listar anuncios de determinado produto
routes.get("/anuncio/:produto_id", (req, res) => {
    res.statusCode(200)
})
// Exibir um único anúncio
routes.get("/anuncio/:anuncio_id", (req, res) => {
    res.statusCode(200)
})
//-------------------Carrinho-----------------
routes.post("/carrinho/:usuario_id")
routes.get("/carrinho/:usuario_id")
routes.get("/carrinho/:usuario_id/:carrinho_id")

//----------------Entrega-----------------


module.exports = routes



