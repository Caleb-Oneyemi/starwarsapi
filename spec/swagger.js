const swaggerJsdoc = require("swagger-jsdoc");

const port = process.env.PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Starwars API",
      version: "0.1.0",
      description: "This is a simple starwars API made with Node, Express and PostgreSQL",
    },
    servers: [
      {
        url: `http://localhost:${port}/api/movies`,
      },
    ],
  },
  apis: ["./openapi.yml"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;