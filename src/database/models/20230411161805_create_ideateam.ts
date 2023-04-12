import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Idea_Team", (table) => {
    table.integer("user").unsigned().notNullable();
    table.foreign("user").references("user_id").inTable("Users");
    table.integer("idea").unsigned().notNullable();
    table.foreign("idea").references("idea_id").inTable("Ideas");
    table
      .enum("user_role", ["Member", "Requested"])
      .notNullable()
      .defaultTo("Requested");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Idea_Team");
}
