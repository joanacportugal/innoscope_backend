import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Idea_Tasks", (table) => {
    table.increments("task_id").primary();
    table.integer("user").unsigned().notNullable();
    table.foreign("user").references("user_id").inTable("Users");
    table.integer("idea").unsigned().notNullable();
    table.foreign("idea").references("idea_id").inTable("Ideas");
    table.string("task_description").notNullable();
    table
      .enum("task_status", ["To Do", "Doing", "Done"])
      .notNullable()
      .defaultTo("To Do");
    table.date("task_dueDate").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Idea_Tasks");
}
