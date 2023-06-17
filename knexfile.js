const config = require('./config');

module.exports = {
  development: {
    client: 'mysql2', // Replace with your database client
    connection: {
      host: config.development.database.host,
      user: config.development.database.username,
      database: config.development.database.database,
      password: config.development.database.password,
      
      // port: config.development.database.port,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
  },
};
