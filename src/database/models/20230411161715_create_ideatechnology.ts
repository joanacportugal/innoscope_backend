import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Idea_Technology", (table) => {
    table.integer("technology").unsigned().notNullable();
    table
      .foreign("technology")
      .references("technology_id")
      .inTable("Technologies");
    table.integer("idea").unsigned().notNullable();
    table.foreign("idea").references("idea_id").inTable("Ideas");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Idea_Technology");
}
