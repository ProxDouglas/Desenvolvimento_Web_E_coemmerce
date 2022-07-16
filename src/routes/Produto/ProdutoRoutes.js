//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../../middlewares/Autenticacao");

const ProdutoController = require('../../controllers/ProdutoController');
const AnuncioController = require("../../controllers/AnuncioController.js");
const upload = require('../../middlewares/ImageMulter');

const routes = Router();


//---------------PRODUTO--------------------------------------------------------
// Criar novo produto na base de dados
routes.post("/", auth, ProdutoController.createProduto);
// Atualizar produto na base de dados
routes.put("/:id_produto", auth, ProdutoController.updateProdutoByID);
// Listar todos os produtos da base de dados
routes.get("/", auth, ProdutoController.getProdutos);
// Listar apenas um produto pelo ID
routes.get("/:id_produto", auth, ProdutoController.getProdutoByID);
// Listar anuncios de determinado produto
routes.get("/:id_produto/anuncio", AnuncioController.getAnuncioByProduto);

routes.post("/:id_produto/imagem", upload.single('image'), ProdutoController.addFoto);

routes.get("/:id_produto/imagem", ProdutoController.getFoto);



module.exports = routes;