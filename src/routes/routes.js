//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../middlewares/Autenticacao");
const passport = require('passport');

const EntregaController = require("../controllers/EntregaController");
const CompraContorller = require("../controllers/CompraController");
const LoginController = require('../controllers/LoginController');
const { createEntrega } = require("../controllers/EntregaController");

const verifyToken = require('../middlewares/AuthGoogle');

const routes = Router()

//---------------LOGIN----------------------------------
// Criar Sessão/Login
routes.post("/login", LoginController.login /* #swagger.tags = ['Login']*/);

routes.post('/login/google/:token', LoginController.alterToken /* #swagger.tags = ['Login']*/);

routes.use('/usuarios', require('./Usuario/UsuarioRoutes') /* #swagger.tags = ['Usuarios']*/);

routes.use('/categorias', require('./Categoria/CategoriaRoutes') /* #swagger.tags = ['Categorias']*/);

routes.use('/produtos', require('./Produto/ProdutoRoutes') /* #swagger.tags = ['Produtos']*/);

routes.use('/anuncios', require('./Anuncio/AnuncioRoutes') /* #swagger.tags = ['Anuncios']*/);

routes.use('/carrinhos', require('./Carrinho/CarrinhoRoutes') /* #swagger.tags = ['Carrinhos']*/);

routes.use('/transacoes', require('./Transacao/TransacaoRoutes') /* #swagger.tags = ['Transacoes']*/);





//----------------Entrega-----------------
// Cria entrega
routes.post("/entrega", EntregaController.createEntrega);
// Lista todas as entregas
routes.get("/entregas", EntregaController.getEntregas);
// Lista entrega pelo ID da entrega
routes.get("/entrega/:id_entrega", EntregaController.getEntregaByID);
// Lista entrega pelo ID da transação
routes.get("/entrega/:id_compra", EntregaController.getEntregaByCompra);
// Atualiza o estado da entrega e o endereço pelo ID da entrega
routes.put("/entrega/:id_entrega", EntregaController.updateEntregaByID);
// Atualiza o estado da entrega pelo ID da transação
routes.put("/entrega/:id_compra", EntregaController.updateEntregaByCompra);


//------------Compra---------------
routes.post("/compra", CompraContorller.createCompra);


module.exports = routes



