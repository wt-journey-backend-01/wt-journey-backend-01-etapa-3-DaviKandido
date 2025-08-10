const migrationsAgentes = require("./20250810210628_create_agentes")
const migrationsCasos = require("./20250810213103_create_casos")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
  return Promise.all([migrationsAgentes.up(knex), migrationsCasos.up(knex)]) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
