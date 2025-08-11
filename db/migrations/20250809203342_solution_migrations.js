const migrationsAgentes = require("./20250810210628_create_agentes");
const migrationsCasos = require("./20250810213103_create_casos");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await migrationsAgentes.up(knex);
  await migrationsCasos.up(knex);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await migrationsCasos.down(knex);
  await migrationsAgentes.down(knex); 
};
