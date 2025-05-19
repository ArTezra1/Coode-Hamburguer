import swaggerAutogen from "swagger-autogen"

const doc = {
  info: {
    title: 'API de uma Hamburgueria',
    description: 'Documentação gerada automaticamente',
  },
  host: 'localhost:3000',
  schemes: ['http'],
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)