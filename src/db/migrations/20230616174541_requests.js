/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("requests", (table) => {
    table.increments();
    table.integer("user_id").references("id").inTable("users");
    table.string("request_status");
    table.string("q1_disability_info", 1000);
    table.string("q2_functional_requirements", 1000);
    table.string("q3_physical_specifications", 1000);
    table.string("q4_lifestyle_usage", 1000);
    table.string("q5_additional", 1000);
    table.string("image_url");
    table.integer("fabricators_needed");
    table.string("category");
    table.timestamps(true, true);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("requests");
