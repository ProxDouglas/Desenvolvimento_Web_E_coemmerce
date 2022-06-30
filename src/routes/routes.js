<<<<<<< Updated upstream
const express = require("express");
const app = express();


// Criar Sessão/Login
app.post("/login")
//---------------USUÁRIO--------------------------------
// Criar Usuário
app.post("/usuario", (req,res) => {
    res.statusCode(200)
})
// Atualizar Usuário
app.put("/usuario", (req, res) => {
    res.statusCode(200)
})
// Atualizar saldo do usuário
app.put("/usuario/:usuario_id/saldo", (req, res) => {
    res.statusCode(200)
})
// Listar todos os usuários
app.get("/usuarios", (req, res) => {
    res.statusCode(200)
})
// Listar apenas um usuário pelo ID
app.get("/usuario/:usuario_id", (req, res) => {
    res.statusCode(200)
})

//---------------PRODUTO--------------------------------------------------------
// Criar novo produto na base de dados
app.post("/produto", (req, res) => {
    res.statusCode(200)
})
// Atualizar produto na base de dados
app.put("/produto", (req, res) => {
    res.statusCode(200)
})
// Excluir Produtos da base de dados
app.delete("/produto/:produto_id", (req, res) => {
    res.statusCode(200)
})
// Listar todos os produtos da base de dados
app.get("/produtos", (req, res) => {
    res.statusCode(200)
})
// Listar apenas um produto pelo ID
app.get("/produto/:produto_id", (req, res) => {
    res.statusCode(200)
})

//------------ANUNCIO DO PRODUTO -------------------------
// Criar anúncio
app.post("/anuncio/:usuario_id",  (req, res) => {
    res.statusCode(200)
})
// Atualizar informações do anúncio
app.put("/anuncio/:usuario_id", (req, res) => {
    res.statusCode(200)
})
// Excluir anuncio de um determinado usuario
app.delete("/anuncio/:anuncio_id", (req, res) => {
    res.statusCode(200)
})
// Excluir anuncio pelo ID
app.delete("/anuncio/:usuario_id", (req, res) => {
    res.statusCode(200)
})
// Listar todos os anúncios
app.get("/anuncio", (req, res) => {
    res.statusCode(200)
})
// Listar os anuncios de determinado usuário
app.get("/anuncio/:usuario_id", (req, res) => {
    res.statusCode(200)
})
// Listar anuncios de determinado produto
app.get("/anuncio/:produto_id", (req, res) => {
    res.statusCode(200)
})
// Exibir um único anúncio
app.get("/anuncio/:anuncio_id", (req, res) => {
    res.statusCode(200)
})
//-------------------Carrinho-----------------
app.post("/carrinho/:usuario_id")
app.get("/carrinho/:usuario_id")
app.get("/carrinho/:usuario_id/:carrinho_id")

=======
const { Router } = require("express");


const UserController = require("../controllers/UserController/UserController");
//const { createUser } = require("../controllers/UserController/UserController");
const routes = Router()


// Criar Sessão/Login
routes.post("/login")
//---------------USUÁRIO--------------------------------
// Criar Usuário
routes.post("/usuario", UserController.createUser);
// Atualizar Usuário
routes.put("/usuario");
// Atualizar saldo do usuário
routes.put("/usuario/:usuario_id/saldo", (req, res) => {
    res.statusCode(200)
})
// Listar todos os usuários
routes.get("/usuarios", UserController.getUser)
// Listar apenas um usuário pelo ID
routes.get("/usuario/:usuario_id", (req, res) => {
    res.statusCode(200)
})

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


module.exports = routes
>>>>>>> Stashed changes
