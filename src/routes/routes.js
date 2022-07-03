//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../middlewares/Autenticacao");

const UserController = require("../controllers/UserController");
const CategoriaController = require("../controllers/CategoriaController");
const ProdutoController = require("../controllers/ProdutoController");
const AnuncioController = require("../controllers/AnuncioController.js");

const routes = Router()

//---------------LOGIN----------------------------------
// Criar Sessão/Login
routes.post("/login", UserController.login);


//---------------USUÁRIO--------------------------------
// Criar Usuário OK
routes.post("/usuario", UserController.createUser);
// Atualizar Usuário
routes.put("/usuario/:usuario_id", UserController.updateUserByID);
// Listar todos os usuários OK
routes.get("/usuarios", auth,  UserController.getUser);
// Listar apenas um usuário pelo ID
routes.get("/usuario/:usuario_id", UserController.getUserByID);
// Listar os anuncios de determinado usuário
routes.get("/usuario/:id_usuario/anuncio", AnuncioController.getAnuncioByUsuario);


//---------------------------Categoria-------------------------------------------
// Criar Categoria
routes.post("/categoria", CategoriaController.createCategoria);
// Atualizar Categoria
routes.put("/categoria/:id_categoria", CategoriaController.updateCategoria);
// Listar Categorias
routes.get("/categorias", CategoriaController.getCategorias);
// Listar categoria pelo ID
routes.get("/categoria/:identificador", CategoriaController.getCategoria);
// Criar Sub-categorias
routes.post("/categoria/:id_categoria/subcategoria", CategoriaController.pushSubCategoria);
//Listar sub-categorias
routes.get("/categoria/:id_categoria/subcategorias", CategoriaController.listSubCategoria);
// Atualizar sub-categorias por ID
routes.put("/categoria/:id_categoria/subcategoria/:id_subcat", CategoriaController.updateByIDSubCategoria);
// Deletar sub-categorias
routes.delete("/categoria/:id_categoria/subcategoria/:id_subcat", CategoriaController.deleteByIDSubCategoria);


//---------------PRODUTO--------------------------------------------------------
// Criar novo produto na base de dados
routes.post("/produto", ProdutoController.createProduto);
// Atualizar produto na base de dados
routes.put("/produto", ProdutoController.updateProdutoByID);
// Listar todos os produtos da base de dados
routes.get("/produtos", ProdutoController.getProdutos);
// Listar apenas um produto pelo ID
routes.get("/produto/:id_produto", ProdutoController.getProdutoByID);
// Listar anuncios de determinado produto
routes.get("/produto/:id_produto/anuncio", AnuncioController.getAnuncioByProduto);


//------------ANUNCIO DO PRODUTO -------------------------
// Criar anúncio
routes.post("/anuncio",  AnuncioController.createAnuncio);
// Lista todos os anúncios
routes.get("/anuncios", AnuncioController.getAnuncios);
// Exibir um único anúncio
routes.get("/anuncio/:id_anuncio", AnuncioController.getAnuncioByID);
// Atualizar informações do anúncio
routes.put("/anuncio/:id_anuncio", AnuncioController.updateAnuncioByID);
// Excluir anuncio pelo ID
routes.delete("/anuncio/:id_usuario", )


//-------------------- Tópicos dentro do anúncio--------------------
// Cria uma pergunta dentro do anuncio
routes.post("/anuncio/:id_anuncio/topico", AnuncioController.pushTopico);
// Lista todas as perguntas do anúncio
routes.get("/anuncio/:id_anuncio/topicos", AnuncioController.getTopicos);
// Lista as perguntas de determinado usuário
routes.get("/anuncio/:id_anuncio/topico/:id_topico", AnuncioController.getTopico);
// Atualiza apenas o texto do tópico
routes.put("/anuncio/:id_anuncio/topico/:id_topico", AnuncioController.editTopico); //apenas texto
// Apaga o tópico de determinado usuário em um anuncio
routes.delete("/anuncio/:id_anuncio/topico/:id_topico", AnuncioController.deleteTopico);






//-------------------Carrinho-----------------
routes.post("/carrinho/:id_usuario")
routes.get("/carrinho/:id_usuario")
routes.get("/carrinho/:id_usuario/:carrinho_id")

//----------------Entrega-----------------


module.exports = routes



