// Update with your config settings.
// const connection = process.env.DB_CONNECTION_STRING
require("dotenv").config();
const connection = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = {

  development: {
    client: 'pg',
    // connection: connection
    connection: 'postgres://postgres:docker@localhost/bloggeropolis'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection
  }

};
