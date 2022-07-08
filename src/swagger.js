const swaggerAutogen = require('swagger-autogen')()
const doc = require('./swaggerDoc');

const outputFile = './src/swagger_output.json'
const endpointsFiles = ['./src/routes/routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})