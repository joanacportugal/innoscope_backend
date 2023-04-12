import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Idea_Author", (table) => {
    table.integer("user").unsigned().notNullable();
    table.foreign("user").references("user_id").inTable("Users");
    table.integer("idea").unsigned().notNullable();
    table.foreign("idea").references("idea_id").inTable("Ideas");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Idea_Author");
}
