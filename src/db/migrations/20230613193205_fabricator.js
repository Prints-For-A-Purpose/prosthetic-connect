/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('fabricator', (table) => {
    table.increments('id');
    table.integer('user_id').references("id").inTable('users');
    table.string('skills');
    table.integer('projects');
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('fabricator');