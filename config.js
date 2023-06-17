// config.js

const config = {
  development: {
    database: {
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: 'my_password',
      database: 'artisans',
    },
    // Add other development environment configurations here
  },
  production: {
    database: {
      host: 'production_host',
      port: 'production_port',
      username: 'production_user',
      password: 'production_password',
      database: 'production_db',
    },
    // Add other production environment configurations here
  },
};

module.exports = config;
