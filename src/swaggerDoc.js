
const doc = {
    info: {
      version: '1.0.0',      // by default: '1.0.0'
      title: 'API E-commerce Lobtec',        // by default: 'REST API'
      description: 'Back end, testes e documentação:  NodeJS, MongoDB, Swagger, Insomnia',  // by default: ''
    },
    host: 'localhost:45678',      // by default: 'localhost:3000'
    basePath: '/',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: ['application/json'],  // by default: ['application/json']
    produces: ['application/json'],  // by default: ['application/json']
    tags: [
      {
          "name": "Usuario",
          "description": "Endpoints"
      }
  ],
    securityDefinitions: {
      api_key: {
        type: "apiKey",
        name: "api_key",
        in: "header"
      },
      petstore_auth: {
        type: "oauth2",
        authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
        flow: "implicit",
        scopes: {
            read_pets: "read your pets",
            write_pets: "modify pets in your account"
          }
      }
    },  // by default: empty object
    definitions: {
        Usuario:{
            nome: "Philipi Simba",
            email: "philipi@simba.com",
            data_nascimento: "1988-05-15",
            cpf: "444.444.444.44",
            telefone: "11 22222-2222",
            senha: "12345",
            endereco: {
                rua: "Rua bela visualViewport",
                numero: 555,
                cep:"77777-777",
                cidade: "São Paulo",
                estado: "SP"
            }
        },
        create: {
            $nome: "Jhon Doe",
            $email: "jhon@gmail.com",
            about: ""
        }
    },          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
  }

  module.exports = doc;