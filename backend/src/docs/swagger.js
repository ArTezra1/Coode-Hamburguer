import swaggerAutogen from 'swagger-autogen';
import swaggerExtra from './swagger_extra.js';
import fs from 'fs';

const doc = {
  info: {
    title: 'API de uma Hamburgueria',
    description: 'Documentação gerada automaticamente',
  },
  host: 'localhost:5000',
  schemes: ['http'],
  tags: [
    {
      name: 'Hambúrgueres',
      description: 'Rotas específicas de hambúrgueres.',
    },
    {
      name: 'Bebidas',
      description: 'Rotas específicas de bebidas.',
    },
  ],
  components: {
    schemas: {
      Burger: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          price: { type: "number" },
          ingredients: {
            type: "array",
            items: { type: "string" },
          },
          description: { type: "string" },
          imageSrc: { type: "string" },
          quantity: { type: "number" }
        },
      },
      Drink: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          price: { type: "number" },
          description: { type: "string" },
          imageSrc: { type: "string" },
          quantity: { type: "number" },
        }
      }
    },
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['../src/routes/index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  const swaggerOutput = JSON.parse(fs.readFileSync(outputFile))

  swaggerOutput.paths = {
    ...swaggerOutput.paths,
    ...swaggerExtra,
  }

  fs.writeFileSync(outputFile, JSON.stringify(swaggerOutput, null, 2))

  console.log("Merge feito")
})
