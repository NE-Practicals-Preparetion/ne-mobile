// const { userRouter } = require('./routes/user/user.routes')

const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes/token.routes']
const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description: "Token Generation APP APIs Documentation."
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [{
    "name": "Tokens",
    "description": "Endpoints"
  }],
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js')
})