require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: process.env.POSTGRES_DB || "policia_db",
    },
    migrations: {
      directory: "./db/migrations",
      extension: "js",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  ci: {
    client: "pg",
    connection: {
      host: "postgres",
      port: 5432,
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: process.env.POSTGRES_DB || "policia_db",
    },
    migrations: {
      directory: "./db/migrations",
      extension: "js",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: process.env.POSTGRES_DB || "policia_db",
    },
    migrations: {
      directory: "./db/migrations",
      extension: "js",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
