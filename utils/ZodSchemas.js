const z = require("zod");

const baseAgenteSchema = z
  .object({

    nome: z
      .string({
        error: (issue) => {
          issue.input === undefined
            ? "Campo obrigatório"
            : "Valor não é um string";
        },
      })
      .min(1, "O campo 'nome' precisa ter pelo menos 1 caractere"),

    dataDeIncorporacao: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message:
          "O campo 'dataDeIncorporacao' precisa seguir a formatação 'YYYY-MM-DD'",
      })
      .min(1, "O campo 'dataDeIncorporacao' precisa ter pelo menos 1 caractere")
      .refine((dataStr) => {
        const date = new Date();
        return !isNaN(date.getDate() && date.toString().startsWith(dataStr));
      })
      .refine(
        (dateStr) => {
          const date = new Date(dateStr);
          const now = new Date();
          return date <= now;
        },
        { message: "Data de incorporação não pode ser no futuro" }
      ),

    cargo: z
      .string({
        error: (issue) => {
          issue.input === undefined
            ? "Campo obrigatório"
            : "Valor não é um string";
        },
      })
      .min(1, "O campo 'nome' precisa ter pelo menos 1 caractere"),
  })
  .strict();

const agentePostSchema = baseAgenteSchema.strict();
const agentePutSchema = baseAgenteSchema.strict();
const agentePatchSchema = baseAgenteSchema.strict().partial();

const baseCasosSchema = z
  .object({
    
    titulo: z
      .string({
        error: (issue) => {
          issue.input === undefined
            ? "Campo obrigatório"
            : "Valor não é um string";
        },
      })
      .min(1, "O campo 'titulo' precisa ter pelo menos 1 caractere"),

    descricao: z
      .string({
        error: (issue) => {
          issue.input === undefined
            ? "Campo obrigatório"
            : "Valor não é um string";
        },
      })
      .min(1, "O campo 'descricao' precisa ter pelo menos 1 caractere"),

    status: z.enum(["aberto", "solucionado"], {
      message: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'",
    }),

    agente_id: z.int({
      error: () => ({
        message: "O campo 'agente_id' precisa ser um id de tipo inteiro referente ao agente correspondente",
      }),
    })
  })
  .strict();

const casoPostSchema = baseCasosSchema.strict();
const casoPutSchema = baseCasosSchema.strict();
const casoPatchSchema = baseCasosSchema.strict().partial();

module.exports = {
  agentePostSchema,
  agentePutSchema,
  agentePatchSchema,

  casoPostSchema,
  casoPutSchema,
  casoPatchSchema,
};
