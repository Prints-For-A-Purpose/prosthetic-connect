/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("comments", (table) => {
    table.increments();
    table.integer("request_id").references("id").inTable("requests");
    table.integer("user_id").references("id").inTable("users");
    table.string("content");
    table.boolean("is_public");
    table.timestamps(true, true);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("comments");
