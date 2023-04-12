import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Idea_Interaction", (table) => {
    table.increments("interaction_id").primary();
    table.enum("interaction_vote", [1, 2, 3, 4, 5]).nullable();
    table.string("interaction_comment").nullable();
    table.boolean("interaction_isFollowing").notNullable().defaultTo(false);
    table.integer("user").unsigned().notNullable();
    table.foreign("user").references("user_id").inTable("Users");
    table.integer("idea").unsigned().notNullable();
    table.foreign("idea").references("idea_id").inTable("Ideas");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Idea_Interaction");
}
