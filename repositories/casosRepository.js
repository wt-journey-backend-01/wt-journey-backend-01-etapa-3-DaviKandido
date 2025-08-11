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
  await db("casos").where({ id }).del();
  return casoDB;
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
