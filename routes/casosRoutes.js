const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

const { casoPostSchema, casoPatchSchema, casoPutSchema  } = require('../utils/ZodSchemas');
const { validateSchema } = require("../utils/validateSchemas");



 /**
 *  @openapi
 * components:
 *   schemas:
 *     caso:
 *       type: object
 *       required:
 *         - id
 *         - titulo
 *         - descricao
 *         - status
 *         - agente_id
 *       properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descricao:
 *           type: string
 *         status:
 *           type: string
 *           enum: [aberto, solucionado]
 *         agente_id:
 *           type: string
 */




// Lista todos os casos registrados.
/**
 * @openapi
 * /casos:
 *   get:
 *     summary: Retorna todos os caso.
 *     description: Essa rota Lista todos os casos.
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: agente_id
 *         schema:
 *           type: string
 *         description: Lista todos os casos atribuídos à um agente específico.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Lista todos os casos em aberto ou solucionados.
 *     responses:
 *       200:
 *         description: Casos retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                 titulo: homicidio
 *                 descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                 status: aberto
 *                 agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *       404:
 *         description: casos não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: casos não encontrados
 *       500:
 *         description: Falha ao obter os casos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao obter os casos
 *
 */
router.get('/', casosController.getCasos);



// Lista todos em que a palavra da query string aparece no titulo ou descricao
/**
 * @openapi
 * /casos/search:
 *   get:
 *     summary: Retorna todos os caso com a palavra da query string.
 *     description: Essa rota Lista todos os caso com a palavra da query string.
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Lista todos em que a palavra da query string aparece no titulo ou descricao
 *     responses:
 *       200:
 *         description: Casos retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                 titulo: homicidio
 *                 descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                 status: aberto
 *                 agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *       404:
 *         description: casos não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: casos não encontrados
 *       500:
 *         description: Falha ao obter os casos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao obter os casos
 *
 */
router.get("/search", casosController.getSearch);


// Retorna os detalhes de um caso específico.
/**
 * @openapi
 * /casos/{id}:
 *   get:
 *     summary: Retorna um caso.
 *     description: Essa rota Lista todos os casos.
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do caso
 *       - in: query
 *         name: agente_id
 *         schema:
 *           type: string
 *         description: Retorna os dados completos do agente responsável por um junto do caso específico.
 * 
 *     responses:
 *       200:
 *         description: caso retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                  id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                  titulo: homicidio
 *                  descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                  status: aberto
 *                  agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                  
 *       404:
 *         description: caso não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: caso não encontrados
 *       500:
 *         description: Falha ao obter o caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao obter o caso
 *
 */
router.get('/:id', casosController.getCasoById);


// Cria um novo caso com os seguintes campos:
/**
 * @openapi
 * /casos:
 *   post:
 *     summary: Cria um caso
 *     description: Essa rota cria um novo caso.
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/caso'
 *           examples:
 *             caso:
 *               value:
 *                 - id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                   titulo: homicidio
 *                   descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                   status: aberto
 *                   agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *     responses:
 *       201:
 *         description: caso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                 titulo: homicidio
 *                 descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                 status: aberto
 *                 agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *       400:
 *         description: Dados incorretos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 400
 *                 message: Parâmetros inválidos
 *                 errors:
 *                   - descricao: O campo 'descricao' precisa ter pelo menos 1 caractere
 *                   - titulo: O campo 'titulo' precisa ter pelo menos 1 caractere
 *       500:
 *         description: Falha ao criar o caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao criar o caso 
 */
router.post("/", validateSchema(casoPostSchema), casosController.createCaso);


// Atualiza os dados de um caso por completo.
/**
 * @openapi
 * /casos/{id}:
 *   put:
 *     summary: Atualiza um caso
 *     description: Essa rota atualiza um caso.
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/caso'
 *           examples:
 *             caso:
 *               value:
 *                 id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                 titulo: homicidio
 *                 descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                 status: aberto
 *                 agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *     responses:
 *       200:
 *         description: caso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                 titulo: homicidio
 *                 descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                 status: aberto
 *                 agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *       404:
 *         description: caso nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: caso nao encontrado
 *       400:
 *         description: Dados incorretos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 400
 *                 message: Parâmetros inválidos
 *                 errors:
 *                    - descricao: O campo 'descricao' precisa ter pelo menos 1 caractere
 *                    - titulo: O campo 'titulo' precisa ter pelo menos 1 caractere
 *       500:
 *         description: Falha ao atualizar o caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao atualizar o caso 
 */
router.put("/:id", validateSchema(casoPutSchema), casosController.updateCaso);

// Atualiza os dados de um caso parcialmente.
/**
 * @openapi
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza um caso parcialmente
 *     description: Essa rota atualiza um caso parcialmente.
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do caso
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/caso'
 *           examples:
 *             caso:
 *               value:
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 *     responses:
 *       200:
 *         description: caso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                 titulo: homicidio
 *                 descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                 status: aberto
 *                 agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *       404:
 *         description: caso nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: caso nao encontrado
 *       400:
 *         description: Dados incorretos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 400
 *                 message: Parâmetros inválidos
 *                 errors:
 *                    - descricao: O campo 'descricao' precisa ter pelo menos 1 caractere
 *                    - titulo: O campo 'titulo' precisa ter pelo menos 1 caractere
 *       500:
 *         description: Falha ao atualizar o caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao atualizar o caso 
 */
router.patch('/:id', validateSchema(casoPatchSchema),casosController.updateCasoPartial);

// Remove um caso.
/**
 * @openapi
 * /casos/{id}:
 *   delete:
 *     summary: deleta um caso
 *     description: Essa rota deleta um caso.
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do caso
 *     responses:
 *       204:
 *         description: caso deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: f5fb2ad5-22a8-4cb4-90f2-8733517a0d46
 *                 titulo: homicidio
 *                 descricao: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.
 *                 status: aberto
 *                 agente_id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 * 
 *       404:
 *         description: caso nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: caso nao encontrado
 * 
 *       500:
 *         description: Falha ao deletar o caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao deletar o caso 
 */
router.delete('/:id', casosController.deleteCaso);

module.exports = router;