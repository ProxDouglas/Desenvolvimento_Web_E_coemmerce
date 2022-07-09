//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../../middlewares/Autenticacao");

const TransacaoController = require("../../controllers/TransacaoController");

const routes = Router();


//------------------Transação------------------
// Cria uma transação
routes.post("/", TransacaoController.createTransacao);
// Atualiza o estado da transação
routes.put("/:id_transacao", TransacaoController.updateTransacaoByID);
// Lista uma transação
routes.get("/:id_transacao", TransacaoController.getTransacaoByID);
// Lista todas as transacoes
routes.get("/", TransacaoController.getTransacoes);
// routes.get("/transacoes", TransacaoController.getTransacaos);



module.exports = routes;