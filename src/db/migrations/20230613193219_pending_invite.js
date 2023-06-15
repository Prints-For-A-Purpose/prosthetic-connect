/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('pending_invite', (table) => {
    table.increments('id');
    table.integer('sending_user').references("id").inTable('users');
    table.integer('recieving_user').references("id").inTable('users');
    table.integer('post').references("id").inTable('posts');
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('pending_invite');