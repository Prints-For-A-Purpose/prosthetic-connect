/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('recipients', (table) => {
    table.increments('id');
    
    table.string('disability_condition');
    table.string('disability_limitation');
    table.string('disability_limbloss');
    table.boolean('disability_public');

    table.string('functional_features');
    table.string('functional_activities');
    table.boolean('functional_public');

    table.string('physical_measurements');
    table.string('physical_consideration');
    table.boolean('physical_public');

    table.string('medical_history');
    table.string('medical_documentation');
    table.string('medical_allergies');
    table.boolean('medical_public');

    table.string('previous_history');
    table.boolean('previous_public');

    table.string('additional_info');
    table.boolean('previous_public');
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('recipients');