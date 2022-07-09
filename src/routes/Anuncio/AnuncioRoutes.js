//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../../middlewares/Autenticacao");

const AnuncioController = require("../../controllers/AnuncioController.js");

const routes = Router();


//------------ANUNCIO DO PRODUTO -------------------------
// Listar todos os anúncios
routes.get("/", AnuncioController.getAnuncios);
// Criar anúncio
routes.post("/", auth,  AnuncioController.createAnuncio);
// Atualizar informações do anúncio
routes.put("/:id_anuncio", auth, AnuncioController.updateAnuncioByID);
// Exibir um único anúncio
routes.get("/:id_anuncio", AnuncioController.getAnuncioByID);
// Excluir anuncio pelo ID
routes.delete("/:id_usuario/:id_anuncio", auth, AnuncioController.deleteAnuncio );


// Cria uma pergunta dentro do anuncio
routes.post("/:id_anuncio/topicos",auth, AnuncioController.pushTopico /* #swagger.tags = ['Topicos']*/);
// Lista todas as perguntas do anúncio
routes.get("/:id_anuncio/topicos", AnuncioController.getTopicos);
// Lista as perguntas de determinado usuário
routes.get("/:id_anuncio/topicos/:id_topico", auth, AnuncioController.getTopico);
// Atualiza apenas texto do tópico de determinado usuário
routes.put("/:id_anuncio/topicos/:id_topico", auth, AnuncioController.editTopico); //apenas texto
// Apaga o tópico de determinado usuário em um anuncio
routes.delete("/:id_anuncio/topicos/:id_topico", auth, AnuncioController.deleteTopico);


routes.post("/:id_anuncio/topicos/:id_topico/comentarios", AnuncioController.pushComentario);
routes.get("/:id_anuncio/topicos/:id_topico/comentarios", AnuncioController.getComentarios);
routes.get("/:id_anuncio/topicos/:id_topico/comentarios/:id_comentario", AnuncioController.getComentarioById);
routes.put("/:id_anuncio/topicos/:id_topico/comentarios/id_comentario", AnuncioController.editComentario);
routes.delete("/:id_anuncio/topicos/:id_topico/comentarios/:id_comentario", AnuncioController.deleteComentario);



module.exports = routes;