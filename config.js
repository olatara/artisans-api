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
    gcp: {
      images: {
        projectId: 'your-project-id',
        keyFilename: 'path/to/service-account-key.json',
        buckets: {
          portfolio_images : "your-bucket-name",
          profile_pictures: "your-bucket-name"
        }
      }
    }
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
    gcp: {
      images: {
        projectId: 'your-project-id',
        keyFilename: 'path/to/service-account-key.json',
        buckets: {
          portfolio_images : "your-bucket-name",
          profile_pictures: "your-bucket-name"
        }
      }
    }
  },
};

function getConfig() {
  const env = process.env.NODE_ENV || 'development';
  return config[env] || config.development;
}

module.exports = getConfig();
