//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../middlewares/Autenticacao");

const UserController = require("../controllers/UserController");
const CategoriaController = require("../controllers/CategoriaController");
const ProdutoController = require("../controllers/ProdutoController");
const AnuncioController = require("../controllers/AnuncioController.js");
const CarrinhoController = require("../controllers/CarrinhoController.js");
const TransacaoController = require("../controllers/TransacaoController");
const Entrega = require("../models/Entrega");
const EntregaController = require("../controllers/EntregaController");
const CompraContorller = require("../controllers/CompraController");
const { createEntrega } = require("../controllers/EntregaController");

const routes = Router()

//---------------LOGIN----------------------------------
// Criar Sessão/Login
routes.post("/login", UserController.login);


//---------------USUÁRIO--------------------------------
// Criar Usuário OK
routes.post("/usuario", auth, UserController.createUser);
// Atualizar Usuário
routes.put("/usuario/:usuario_id", auth, UserController.updateUserByID);
// Listar todos os usuários OK
routes.get("/usuarios", auth, UserController.getUser);
// Listar apenas um usuário pelo ID
routes.get("/usuario/:usuario_id", auth, UserController.getUserByID);
// Listar os anuncios de determinado usuário
routes.get("/usuario/:id_usuario/anuncio", auth, AnuncioController.getAnuncioByUsuario);


//---------------------------Categoria-------------------------------------------
// Criar Categoria
routes.post("/categoria", auth, CategoriaController.createCategoria);
// Atualizar Categoria
routes.put("/categoria/:id_categoria", auth, CategoriaController.updateCategoria);
// Listar Categorias
routes.get("/categorias", CategoriaController.getCategorias);
// Listar categoria pelo ID
routes.get("/categoria/:identificador", CategoriaController.getCategoria);
// Criar Sub-categorias
routes.post("/categoria/:id_categoria/subcategoria", auth, CategoriaController.pushSubCategoria);
//Listar sub-categorias
routes.get("/categoria/:id_categoria/subcategorias", CategoriaController.listSubCategoria);
// Atualizar sub-categorias por ID
routes.put("/categoria/:id_categoria/subcategoria/:id_subcat", auth, CategoriaController.updateByIDSubCategoria);
// Deletar sub-categorias
routes.delete("/categoria/:id_categoria/subcategoria/:id_subcat", auth, CategoriaController.deleteByIDSubCategoria);


//---------------PRODUTO--------------------------------------------------------
// Criar novo produto na base de dados
routes.post("/produto", auth, ProdutoController.createProduto);
// Atualizar produto na base de dados
routes.put("/produto/:id_produto", auth, ProdutoController.updateProdutoByID);
// Listar todos os produtos da base de dados
routes.get("/produtos", auth, ProdutoController.getProdutos);
// Listar apenas um produto pelo ID
routes.get("/produto/:id_produto", auth, ProdutoController.getProdutoByID);
// Listar anuncios de determinado produto
routes.get("/produto/:id_produto/anuncio", AnuncioController.getAnuncioByProduto);


//------------ANUNCIO DO PRODUTO -------------------------
// Listar todos os anúncios
routes.get("/anuncios", AnuncioController.getAnuncios);
// Criar anúncio
routes.post("/anuncio", auth,  AnuncioController.createAnuncio);
// Atualizar informações do anúncio
routes.put("/anuncioU/:id_anuncio", auth, AnuncioController.updateAnuncioByID);
// Exibir um único anúncio
routes.get("/anuncio/:id_anuncio", AnuncioController.getAnuncioByID);
// Excluir anuncio pelo ID
routes.delete("/anuncio/:id_usuario/:id_anuncio", auth, AnuncioController.deleteAnuncio )


// Cria uma pergunta dentro do anuncio
routes.post("/anuncio/:id_anuncio/topico",auth, AnuncioController.pushTopico);
// Lista todas as perguntas do anúncio
routes.get("/anuncio/:id_anuncio/topicos", AnuncioController.getTopicos);
// Lista as perguntas de determinado usuário
routes.get("/anuncio/:id_anuncio/topico/:id_topico", auth, AnuncioController.getTopico);
// Atualiza apenas texto do tópico de determinado usuário
routes.put("/anuncio/:id_anuncio/topico/:id_topico", auth, AnuncioController.editTopico); //apenas texto
// Apaga o tópico de determinado usuário em um anuncio
routes.delete("/anuncio/:id_anuncio/topico/:id_topico", auth, AnuncioController.deleteTopico);


// routes.post("/anuncio/:id_anuncio/topico/:id_topico/comentario", );
// routes.get("/anuncio/:id_anuncio/topico/:id_topico/comentario", );
// routes.get("/anuncio/:id_anuncio/topico/:id_topico/comentario", );
// routes.put("/anuncio/:id_anuncio/topico/:id_topico/comentario", );
// routes.delete("/anuncio/:id_anuncio/topico/:id_topico/comentario", );



//-------------------Carrinho-----------------
//o id do usuario vai na requisicao json
// Criar Carrinho de compras
routes.post("/carrinho/:id_usuario", auth, CarrinhoController.pushAnuncioCarrinho);
// Apagar carrinho de compras
routes.delete("/carrinho/:id_usuario/anuncio/:id_anuncio", auth, CarrinhoController.deleteAnuncioCarrinho)
// Listar carrinho do usuário
routes.get("/carrinho/:id_usuario", auth, CarrinhoController.getCarrinhoByIDUser);
//routes.get("/carrinhos");

//------------------Transação------------------
// Cria uma transação
routes.post("/transacao", TransacaoController.createTransacao);
// Atualiza o estado da transação
routes.put("/transacao/:id_transacao", TransacaoController.updateTransacaoByID);
// Lista uma transação
routes.get("/transacao/:id_transacao", TransacaoController.getTransacaoByID);
// Lista todas as transacoes
// routes.get("/transacoes", TransacaoController.getTransacaos);



//----------------Entrega-----------------
// Cria entrega
routes.post("/entrega", EntregaController.createEntrega);
// Lista todas as entregas
routes.get("/entregas", EntregaController.getEntregas);
// Lista entrega pelo ID da entrega
routes.get("/entrega/:id_entrega", EntregaController.getEntregaByID);
// Lista entrega pelo ID da transação
routes.get("/entrega/:id_transacao", EntregaController.getEntregaByTransacao);
// Atualiza o estado da entrega e o endereço pelo ID da entrega
routes.put("/entrega/:id_entrega", EntregaController.updateEntregaByID);
// Atualiza o estado da entrega pelo ID da transação
routes.put("/entrega/:id_transacao", EntregaController.updateEntregaByTransacao);


//------------Compra---------------
routes.post("/compra", CompraContorller.createCompra);


module.exports = routes



