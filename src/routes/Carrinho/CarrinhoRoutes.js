//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../../middlewares/Autenticacao");

const CarrinhoController = require("../../controllers/CarrinhoController.js");


const routes = Router();


//-------------------Carrinho-----------------
//o id do usuario vai na requisicao json
// Criar Carrinho de compras
routes.post("/:id_usuario", auth, CarrinhoController.pushAnuncioCarrinho);
// Apagar carrinho de compras
routes.delete("/:id_usuario/anuncio/:id_anuncio", auth, CarrinhoController.deleteAnuncioCarrinho)
// Listar carrinho do usuário
routes.get("/:id_usuario", auth, CarrinhoController.getCarrinhoByIDUser);
//routes.get("/carrinhos");



module.exports = routes;