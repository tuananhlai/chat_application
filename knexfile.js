// Config for knex.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "remotemysql.com",
      user: "fYmKBEoBCr",
      password: "UQjpyrNy33",
      database: "fYmKBEoBCr"
    },
    migrations: {
      directory: __dirname + "/databases/migrations"
    },
    seeds: {
      directory: __dirname + "/databases/seeds/development"
    },
    // debug: true
  },

  staging: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "guest",
      password: "guest",
      database: "chat_application"
    },
    migrations: {
      directory: __dirname + "/databases/migrations"
    },
    seeds: {
      directory: __dirname + "/databases/seeds/staging"
    }
  },

  production: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    migrations: {
      directory: __dirname + "/databases/migrations"
    },
    seeds: {
      directory: __dirname + "/databases/seeds/production"
    }
  }
};
