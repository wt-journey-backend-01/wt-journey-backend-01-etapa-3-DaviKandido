const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

const {
  agentePostSchema,
  agentePatchSchema,
  agentePutSchema,
} = require("../utils/ZodSchemas");
const { validateSchema, validateCargo } = require("../utils/validateSchemas");

/**
 * @openapi
 * components:
 *   schemas:
 *     Agente:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *         - dataDeIncorporacao
 *         - cargo
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         dataDeIncorporacao:
 *           type: string
 *           format: date
 *         cargo:
 *           type: string
 */

// Lista todos os agentes registrados.
/**
 * @openapi
 * /agentes:
 *   get:
 *     summary: Retorna todos os agentes.
 *     description: Essa rota lista todos os agentes.
 *     tags: [Agentes]
 *     parameters:
 *       - in: query
 *         name: cargo
 *         schema:
 *           type: string
 *         description: Cargo do agente
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Ordena os agentes por data de incorporação
 *     responses:
 *       200:
 *         description: Agente retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agente'
 *             examples:
 *               ListaDeAgentes:
 *                 value:
 *                   - id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                     nome: Rommel Carneiro
 *                     dataDeIncorporacao: 1992/10/04
 *                     cargo: delegado
 *       404:
 *         description: Agentes não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: Agentes não encontrados
 *       500:
 *         description: Falha ao obter os agentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao obter os agentes
 */
router.get("/", validateCargo, agentesController.getAgentes);

// Retorna os detalhes de um agente específico.
/**
 * @openapi
 * /agentes/{id}:
 *   get:
 *     summary: Retorna um agente.
 *     description: Essa rota retorna os detalhes de um agente.
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do agente
 *     responses:
 *       200:
 *         description: Agente retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *             examples:
 *               ExemploAgente:
 *                 value:
 *                   id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                   nome: Rommel Carneiro
 *                   dataDeIncorporacao: 1992/10/04
 *                   cargo: delegado
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: Agente não encontrado
 *       500:
 *         description: Falha ao obter o agente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao obter o agente
 */
router.get("/:id", agentesController.getAgenteById);


// Retorna os detalhes de um agente específico.
/**
 * @openapi
 * /agentes/{id}/casos:
 *   get:
 *     summary: Retorna os casos referentes a um agente.
 *     description: Essa rota  listar todos os casos atribuídos a um agente.
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do agente
 *     responses:
 *       200:
 *         description: Casos do agente retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *             examples:
 *               ExemploAgente:
 *                 value:
 *                 id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                 titulo: homicidio
 *                 descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                 status: aberto
 *                 agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: Agente não encontrado
 *       500:
 *         description: Falha ao obter os casos do agente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao obter o agente
 */
router.get("/:id/casos", agentesController.getCasosByAgenteId);



// Cria um novo agente.
/**
 * @openapi
 * /agentes:
 *   post:
 *     summary: Cria um agente
 *     description: Essa rota cria um novo agente.
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *           examples:
 *             Agente:
 *               value:
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *             examples:
 *               AgenteCriado:
 *                 value:
 *                   id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                   nome: Rommel Carneiro
 *                   dataDeIncorporacao: 1992/10/04
 *                   cargo: delegado
 *       400:
 *         description: Dados incorretos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 400
 *               message: Parâmetros inválidos
 *               errors:
 *                 - campo: nome
 *                   erro: Campo obrigatório
 *       500:
 *         description: Falha ao criar o agente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 500
 *               message: Falha ao criar o agente
 */
router.post(
  "/",
  validateSchema(agentePostSchema),
  agentesController.createAgente
);

// Atualiza todos os dados de um agente.
/**
 * @openapi
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza um agente
 *     description: Essa rota atualiza todos os dados de um agente.
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 404
 *               message: Agente não encontrado
 *       400:
 *         description: Dados incorretos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 400
 *               message: Erro de validação
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 500
 *               message: Erro no servidor
 */
router.put(
  "/:id",
  validateSchema(agentePutSchema),
  agentesController.updateAgente
);

// Atualiza parcialmente um agente.
/**
 * @openapi
 * /agentes/{id}:
 *   patch:
 *     summary: Atualiza um agente parcialmente
 *     description: Essa rota atualiza dados parciais de um agente.
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do agente
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 404
 *               message: Agente não encontrado
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 400
 *               message: Dados inválidos
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 500
 *               message: Falha ao atualizar o agente
 */
router.patch(
  "/:id",
  validateSchema(agentePatchSchema),
  agentesController.updateAgentePartial
);

// Deleta um agente.
/**
 * @openapi
 * /agentes/{id}:
 *   delete:
 *     summary: Deleta um agente
 *     description: Essa rota deleta um agente.
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do agente
 *     responses:
 *       204:
 *         description: Agente deletado com sucesso
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 404
 *               message: Agente não encontrado
 *       500:
 *         description: Falha ao deletar o agente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: 500
 *               message: Falha ao deletar o agente
 */
router.delete("/:id", agentesController.deleteAgente);

module.exports = router;
