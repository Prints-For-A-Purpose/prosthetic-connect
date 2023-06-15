/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('posts', (table) => {
    table.increments('id');
    table.integer('user_id').references("id").inTable('users');
    table.string('title');
    table.string('desc');
    table.integer('questionare').references('id').inTable('questionare')
    table.string('accepted_users');
    table.string('post_type');
    table.string('location');
    table.date('end_date');
    table.string('photo_url');
    table.timestamps(true, true);
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('posts');