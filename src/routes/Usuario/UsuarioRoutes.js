//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../../middlewares/Autenticacao");

const UserController = require("../../controllers/UserController");
const AnuncioController = require("../../controllers/AnuncioController.js");

const routes = Router();

//---------------USUÁRIO--------------------------------
// Criar Usuário OK
routes.post("/", UserController.createUser
/*  

            
            #swagger.description = 'Endpoint para adicionar usuario.' 

            #swagger.parameters['usuario'] = {
                in: 'body',
                description: 'Dados do Usuario.',
                required: true,
                schema: {  $ref: "#/definitions/Usuario" }
            }
        */

);
// Atualizar Usuário
routes.put("/:usuario_id", auth, UserController.updateUserByID
/*  

            
            #swagger.description = 'Endpoint para atualizar usuario. Requer autenticação.'

            #swagger.parameters['usuario_id'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            }

            #swagger.parameters['usuario'] = {
                in: 'body',
                description: 'User data.',
                required: true,
                schema: {  $ref: "#/definitions/Usuario" }
            }
        */
);



routes.post('/id_usuario/enderecos',auth, UserController.addEndereco
/*  

            
            #swagger.description = 'Endpoint para adicionar endereco. Requer autenticação.'

            #swagger.parameters['usuario_id'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            }

            #swagger.parameters['endereco'] = {
                in: 'body',
                description: 'Dados de endereco.',
                required: true,
                schema: {  $ref: "#/definitions/Endereco" }
            }
        */
);


routes.post('/id_usuario/avaliar',auth, UserController.pushAvaliacao
/*  

            
            #swagger.description = 'Endpoint para adicionar uma avalizacao ao usuario. Requer autenticação.'

            #swagger.parameters['usuario_id'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            }

            #swagger.parameters['avaliacao'] = {
                in: 'body',
                description: 'Dados de avalizacao.',
                required: true,
                schema: {  $ref: "#/definitions/Avaliacao" }
            }
        */
);

// Listar todos os usuários OK
routes.get("/", auth, UserController.getUser);
// Listar apenas um usuário pelo ID
routes.get("/:usuario_id", auth, UserController.getUserByID);
// Listar os anuncios de determinado usuário
routes.get("/:id_usuario/anuncio", auth, AnuncioController.getAnuncioByUsuario);


module.exports = routes;