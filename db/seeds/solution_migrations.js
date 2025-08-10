const seedAgentes = require("./01_agentes.js");
const seedCasos = require("./02_casos.js");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await seedAgentes.seed(knex);
  await seedCasos.seed(knex);
};
