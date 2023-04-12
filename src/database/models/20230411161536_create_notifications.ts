import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Notifications", (table) => {
    table.increments("notification_id").primary();
    table.string("notification_title").notNullable();
    table.string("notification_description").notNullable();
    table.integer("user").unsigned().notNullable();
    table.foreign("user").references("user_id").inTable("Users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Notifications");
}
