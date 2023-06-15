/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('postcomments', (table) => {
    table.increments('id');
    table.integer('post_id').references("id").inTable('posts');
    table.string('requests');
    table.timestamps(true, true);

  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('postcomments');