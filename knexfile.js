const config = require('./config');

module.exports = {
  development: {
    client: 'mysql2', // Replace with your database client
    connection: {
      host: config.database.host,
      user: config.database.username,
      database: config.database.database,
      password: config.database.password,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
  },
};
