import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Technologies", (table) => {
    table.increments("technology_id").primary();
    table.string("technology_name").notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Technologies");
}
