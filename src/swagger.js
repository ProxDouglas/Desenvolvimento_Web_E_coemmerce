const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger_output.json'
const endpointsFiles = ['./src/routes/routes.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index.js')
})