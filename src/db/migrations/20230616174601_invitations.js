/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('invitations', (table) => {
    table.increments();
    table.integer('request_id').references("id").inTable('requests');
    table.integer('user_id').references("id").inTable('users');
    table.timestamps(true, true);
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('invitations');