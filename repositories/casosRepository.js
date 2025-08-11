/*
Estrutura de um caso:
id: string (UUID) obrigatório.
titulo: string obrigatório.
descricao: string obrigatório.
status: deve ser "aberto" ou "solucionado" obrigatório.
agente_id: string (UUID), id do agente responsável obrigatório Exemplo:

{
    "id": "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    "titulo": "homicidio",
    "descricao": "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    "status": "aberto",
    "agente_id": "401bccf5-cf9e-489d-8412-446cd169a0f1" 

}


Regras e Validações:
status deve ser "aberto" ou "solucionado".
IDs inexistentes devem retornar status 404.
Dados mal formatados devem retornar status 400.
Status HTTP esperados: 201, 200, 204, 400, 404.
*/

const db = require("../db/db");

const findAll = async ({ agente_id = null, status = null, q = null }) => {
  const query = db("casos");

  if (agente_id) {
    query.where("agente_id", agente_id);
  }

  if (status) {
    query.where("status", status);
  }

  if (q) {
    query.where(function () {
      this.whereILike("titulo", `%${q}%`).orWhereILike("descricao", `%${q}%`);
    });
  }

  return query;
};

const findById = async (id) =>
  await db("casos").where({ id }).first();

const create = async (caso) => {
  const [newCaso] = await db.insert(caso).into("casos").returning("*");
  return newCaso;
};

const getCasosByAgenteId = async (id) =>
  await db("casos").where({ agente_id: id });

const update = async (id, caso) => {
  const casoDB = await db("casos").where({ id }).first();
  if (!casoDB) {
    return null;
  }
  const updatedCaso = await db("casos")
    .update(caso)
    .where({ id: id })
    .returning("*");
  return updatedCaso[0];
};

const updatePartial = async (id, caso) => {
  const casoDB = await db("casos").where({ id }).first();
  if (!casoDB) {
    return null;
  }

  const updateCaso = { ...casoDB, ...caso };
  const updatedCaso = await db("casos")
    .update(updateCaso)
    .where({ id: id })
    .returning("*");
  return updatedCaso[0];
};

const remove = async (id) => {
  const casoDB = await db("casos").where({ id }).first();
  if (!casoDB) {
    return null;
  }
  const [removedCaso] = await db("casos").where({ id }).del().returning("*");
  return removedCaso;
};

module.exports = {
  findAll,
  findById,
  getCasosByAgenteId,
  create,
  update,
  updatePartial,
  remove,
};
