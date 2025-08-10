const db = require("../db/db");

const findAll = async ({ cargo = null, sort = null }) => {
  let query = db("agentes");

  // Filtro por cargo
  if (cargo) {
    query = query.where("cargo", cargo);
    // Se quiser case insensitive no Postgres
  }

  // Ordenação
  if (sort) {
    if (sort === "dataDeIncorporacao") {
      query = query.orderBy("dataDeIncorporacao", "asc");
    } else if (sort === "-dataDeIncorporacao") {
      query = query.orderBy("dataDeIncorporacao", "desc");
    }
  }

  return query;
};

const findById = async (id) =>
  await db("agentes").where({ id }).first();

const create = async (agente) => {
  const [newAgente] = await db.insert(agente).into("agentes").returning("*");
  return newAgente;
};

const update = async (id, agente) => {
  const agenteDB = await db("agentes").where({ id }).first();
  if (!agenteDB) {
    return null;
  }
  const updatedagente = await db("agentes")
    .update(agente)
    .where({ id: id })
    .returning("*");
  return updatedagente[0];
};

const updatePartial = async (id, agente) => {
  const agenteDB = await db("agentes").where({ id }).first();
  if (!agenteDB) {
    return null;
  }
  const updateAgente = { ...agenteDB, ...agente };
  const updatedAgente = await db("agentes")
    .update(agente)
    .where({ id: id })
    .returning("*");

  return updatedAgente[0];
};

const remove = async (id) => {
  const agenteDB = await db("agentes")
    .where({ id: id })
    .first();
  if (!agenteDB) {
    return null;
  }
  const removedAgente = await db("agentes").del().where({ id }).returning("*");
  return removedAgente[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  updatePartial,
  remove,
};
