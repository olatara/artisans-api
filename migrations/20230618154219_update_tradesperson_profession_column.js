exports.up = function (knex) {
  return knex.raw(`
    ALTER TABLE tradespersons
    MODIFY COLUMN profession ENUM('plumber', 'electrician', 'carpenter', 'painter') NOT NULL
  `);
};

exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE tradespersons
    MODIFY COLUMN profession VARCHAR(255) NOT NULL
  `);
};
