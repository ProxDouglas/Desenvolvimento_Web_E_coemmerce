const express = require("express");
const app = express();



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
app.put("/usuario/:user_id/saldo", (req, res) => {
    res.statusCode(200)
})
// Listar todos os usuários
app.get("/usuarios", (req, res) => {
    res.statusCode(200)
})
// Listar apenas um usuário pelo ID
app.get("/usuario/:user_id", (req, res) => {
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



