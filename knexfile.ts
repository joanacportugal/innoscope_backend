import { Knex } from "knex";
require("dotenv").config();

const config: Knex.Config = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/database/models",
  },
};

export default config;
