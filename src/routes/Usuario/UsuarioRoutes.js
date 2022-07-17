//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../../middlewares/Autenticacao");

const UserController = require("../../controllers/UserController");
const AnuncioController = require("../../controllers/AnuncioController.js");
const upload = require('../../middlewares/ImageMulter');

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
            },

            #swagger.responses[201] = {
            description: 'User successfully obtained.',
            schema: { $ref: '#/definitions/UsuarioResponse' }
        */

);
// Atualizar Usuário
routes.put("/:id_usuario", auth, UserController.updateUserByID
/*  

            
            #swagger.description = 'Endpoint para atualizar usuario. Requer autenticação.'

            #swagger.parameters['id_usuario'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            },

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

            #swagger.parameters['id_usuario'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            },

            #swagger.parameters['endereco'] = {
                in: 'body',
                description: 'Dados de endereco.',
                required: true,
                schema: {  $ref: "#/definitions/Endereco" }
            }
        */
);


routes.post('/:id_usuario/avaliar',auth, UserController.pushAvaliacao
/*  

            
            #swagger.description = 'Endpoint para adicionar uma avalizacao ao usuario. Requer autenticação.'

            #swagger.parameters['id_usuario'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            },

            #swagger.parameters['avaliacao'] = {
                in: 'body',
                description: 'Dados de avalizacao.',
                required: true,
                schema: {
                    $avaliador: '62c0c85056cb82127d8e8105',
                    $nota: 5
                }
            },
            #swagger.responses[201] = {
            description: 'User successfully obtained.',
            schema: {
                    $avaliador: '62c0c85056cb82127d8e8105',
                    $nota: 5
                }
        */
);

routes.get('/:id_usuario/avaliar',auth, UserController.avaliacaoByIdUsuario
         /*
         #swagger.description = 'Endpoint para pegar a media das avaliações. Requer autenticação.'

            #swagger.parameters['id_usuario'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            },

            #swagger.responses[200] = {
            description: 'Media obtida com sucesso.',
            schema: { media: 5.0 }
         */   
);

// Listar todos os usuários OK
routes.get("/", UserController.getUser 
    /* #swagger.responses[200] = {
            description: 'User successfully obtained.',
            schema: [{ $ref: '#/definitions/UsuarioResponse' }]
    } */
);
// Listar apenas um usuário pelo ID
routes.get("/:id_usuario", UserController.getUserByID
    /* #swagger.responses[200] = {
            description: 'User successfully obtained.',
            schema: { $ref: '#/definitions/UsuarioResponse' }
    } */
);
// Listar os anuncios de determinado usuário
routes.get("/:id_usuario/anuncio", AnuncioController.getAnuncioByUsuario
        /*
            #swagger.description = 'Endpoint para pegar todos anuncios feito pelo usuario. Requer autenticação.'

            #swagger.parameters['id_usuario'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            }, 
 */
);

routes.post("/:id_usuario/avatar", upload.single('image'), UserController.addAvatar
        /*
            #swagger.description = 'Endpoint para adicionar uma Imagem ao usuario um Multipart form de um imagem. Requer autenticação.'

            #swagger.parameters['id_usuario'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            }, 
 */
);

routes.get("/:id_usuario/avatar", UserController.getAvatar
            /*
            #swagger.description = 'Endpoint para adquirir a imagem de perfil. Requer autenticação.'

            #swagger.parameters['id_usuario'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            }, 
 */
);

routes.post('/:id_usuario/favoritos', UserController.pushFavorito
            /*  

            
            #swagger.description = 'Endpoint para adicionar aos favoritos ao usuario. Requer autenticação.'

            #swagger.parameters['id_usuario'] = {
                in: 'path',
                description: 'ID do Usuario.',
                required: true,
                type: 'String'
            },

            #swagger.parameters['avaliacao'] = {
                in: 'body',
                description: 'Dados de avalizacao.',
                required: true,
                schema: {
                    $id_anuncio: '62c0c85056cb82127d8e8105'
                }
            },
        */
);

routes.get('/:id_usuario/favoritos', UserController.getFavoritos

            /* #swagger.responses[200] = {
            description: 'Anuncios favoritos obtidos com sucesso.',
            schema: { $ref: '#/definitions/Anuncio' }
    } */
);


module.exports = routes;