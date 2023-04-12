import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Ideas", (table) => {
    table.increments("idea_id").primary();
    table.string("idea_title").notNullable();
    table.text("idea_description").notNullable();
    table.integer("category").unsigned().notNullable();
    table.foreign("category").references("category_id").inTable("Categories");
    table.enum("idea_complexity", ["Easy", "Medium", "Hard"]).notNullable();
    table.integer("idea_durationWeeks").notNullable();
    table.boolean("idea_isAnon").notNullable().defaultTo(false);
    table
      .enum("idea_status", [
        "New",
        "Rejected",
        "Approved",
        "Waiting",
        "On Going",
        "Finished",
      ])
      .notNullable()
      .defaultTo("New");
    table.text("idea_details").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Ideas");
}
