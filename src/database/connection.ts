import knex from "knex";
require("dotenv").config();

const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  useNullAsDefault: true,
});

export default db;
