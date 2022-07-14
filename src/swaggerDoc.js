
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
    securityDefinitions: {
      api_key: {
        type: "apiKey",
        name: "api_key",
        in: "header"
      },
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      OAuth2: {
        type: 'oauth2',
        flows: {
            authorizationCode: {
                authorizationUrl: 'https://example.com/oauth/authorize',
                tokenUrl: 'https://example.com/oauth/token',
                scopes: {
                    read: 'Grants read access',
                    write: 'Grants write access',
                    admin: 'Grants access to admin operations'
                }
            }
        }
      },
    },  // by default: empty object
    definitions: {
      Login: {
        $email: "philipi@simba.com",
        $senha: "12345"
      },

      LoginResponse: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoaWxpcGlAc2ltYmEuY29tIiwibm9tZSI6IlBoaWxpcGkgU2ltYmEiLCJpYXQiOjE2NTc4MjQwMTgsImV4cCI6MTY1NzgzMTIxOH0.8_5tHeFg9H3XRVhhLISz74LxPF9w8dLMd7wM454N_SM"
      ,

      Usuario:{
          $nome: "Philipi Simba",
          $email: "philipi@simba.com",
          data_nascimento: "1988-05-15",
          cpf: "444.444.444.44",
          telefone: "11 22222-2222",
          endereco: {
              $rua: "Rua bela visualViewport",
              $numero: 555,
              apt: "terceiro bloco",
              $cep:"77777-777",
              $cidade: "São Paulo",
              $estado: "SP"
          }
      },

      UsuarioResponse:{
        $nome: "Philipi Simba",
        $email: "philipi@simba.com",
        data_nascimento: "1988-05-15",
        cpf: "444.444.444.44",
        $senha: "12345",
        telefone: "11 22222-2222",
        endereco: {
            $rua: "Rua bela visualViewport",
            $numero: 555,
            apt: "terceiro bloco",
            $cep:"77777-777",
            $cidade: "São Paulo",
            $estado: "SP"
        }
      },

      UsuarioGoogle:{
        $id_google: "1234567890",
        $nome: "Philipi Simba",
        $email: "philipi@simba.com",
      },

      Endereco: {
        $rua: "Rua bela visualViewport",
        $numero: 555,
        apt: "terceiro bloco",
        $cep:"77777-777",
        $cidade: "São Paulo",
        $estado: "SP"
      },

      Avaliacao: {
        $avaliador: "62c46e186ef566e681297d59",
        nota: 10
      }
        
    },          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
  }

  module.exports = doc;