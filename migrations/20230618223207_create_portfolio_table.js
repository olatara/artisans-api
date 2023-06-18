exports.up = function (knex) {
  return knex.schema.createTable('portfolio', function (table) {
    table.increments('id').primary();
    table.integer('tradesperson_id').unsigned().notNullable().references('id').inTable('tradespersons');
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.date('date').notNullable();
    table.json('photos').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('portfolio');
};
