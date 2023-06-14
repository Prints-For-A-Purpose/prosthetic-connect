/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('recipients', (table) => {
    table.increments('id');
    table.integer('user_id').references("id").inTable('users');
    table.string('requests');
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('recipients');