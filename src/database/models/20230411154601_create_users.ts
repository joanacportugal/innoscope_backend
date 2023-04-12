import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Users", (table) => {
    table.increments("user_id").primary();
    table.string("user_name").notNullable();
    table.string("user_email").notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Users");
}
