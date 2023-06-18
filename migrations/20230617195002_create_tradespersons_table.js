/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tradespersons', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('profession').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone').notNullable();
    table.text('bio');

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tradespersons');
};
