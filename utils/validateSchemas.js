const z = require("zod");

function validateSchema(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues;
      const errors = {};
      for (const issue of issues) {
        const field = issue.path[0];
        const message = issue.message;

        if (!errors[field]) {
          errors[field] = message;
        }
      }
      return res.status(400).json({
        status: 400,
        message: "Parâmetros inválidos",
        errors,
      });
    }
    next();
  };
}

function validateCargo(req, res, next) {
  const cargosValidos = [
    "inspetor",
    "delegado",
    "investigador",
    "escrivão",
    "perito",
  ];
  if (req.query.cargo && !cargosValidos.includes(req.query.cargo)) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors: [
        {
          cargo:
            "O campo 'cargo' pode ser somente um dos seguintes valores: " +
            cargosValidos.join(", "),
        },
      ],
    });
  }
  next();
}

module.exports = {
  validateSchema,
  validateCargo,
};
