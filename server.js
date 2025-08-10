const express = require("express");
const swagger = require("./docs/swagger");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const casosRouter = require("./routes/casosRoutes");
const agentesRouter = require("./routes/agentesRoutes");
const ApiError = require("./utils/errorHandler");

app.use((req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} | Requisição: ${req.method} ${req.url}`
  );
  next();
});

app.use("/casos", casosRouter);
app.use("/agentes", agentesRouter);


swagger(app);

const PORT = process.env.PORT || 3000;

// Catch-all para rotas não encontradas → envia para o middleware de erro
app.use((req, res, next) => {
  const error = new ApiError("Page not found!", 404, [
    {
      path: req.url,
      message: "Page not found!",
    },
  ]);
  next(error); // passa para o middleware de erro
});

// Middleware de erro que trata 404 e demais erros
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: err.message || "Something went wrong!",
    errors: err.errors || null,
  });
});

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em localhost:${PORT}`
  );
});
