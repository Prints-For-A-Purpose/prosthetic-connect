/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').unique();
    table.string('password_hash');
    table.boolean('is_fabricator');
    table.timestamps(true, true);
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('users');