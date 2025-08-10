const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swagger = (app) => {
  const option = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "wt-journey-backend-01-etapa-2-davikandido",
        description:
          "[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/pktpEP6V) # Etapa 2: API para o Departamento de Polícia",
        version: "1.0.0",
        license: {
          name: "ISC",
        },
        termsOfService: "http://localhost:3000/terms/",
        contact: {
          name: "Davi Cândido",
          email: "davicandidopucminas@gmail.com",
          phone: "+55 (31) 97306-7259",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/",
          description: "Ambiente de desenvolvimento",
        },
        {
          url: "https://www.crudJourney.com/v2",
          description: "Ambiente de produção",
        },
      ],
    },
    apis: [path.join(__dirname, "../routes/*.js")],
  };

  const specs = swaggerJSDoc(option);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

}

module.exports = swagger