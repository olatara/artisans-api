// config.js
require("dotenv").config();
const config = {
  development: {
    database: {
      host: process.env.HOST,
      port: process.env.PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
    },
    gcp: {
      images: {
        projectId: "artisans-dev-392118",
        keyFilename: "./artisans-dev-firebase-adminsdk-kdvgs-b1fe5283d2.json",
        buckets: {
          portfolio_images: "artisans-portfolio",
          profile_pictures: "your-bucket-name",
        },
      },
    },
    // Add other development environment configurations here
  },
  production: {
    database: {
      host: "production_host",
      port: "production_port",
      username: "production_user",
      password: "production_password",
      database: "production_db",
    },
    gcp: {
      images: {
        projectId: "your-project-id",
        keyFilename: "path/to/service-account-key.json",
        buckets: {
          portfolio_images: "your-bucket-name",
          profile_pictures: "your-bucket-name",
        },
      },
    },
  },
};

function getConfig() {
  const env = process.env.NODE_ENV || "development";
  return config[env] || config.development;
}

module.exports = getConfig();
