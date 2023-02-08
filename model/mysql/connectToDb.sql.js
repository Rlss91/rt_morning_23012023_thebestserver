const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASS,
    database: process.env.MYSQLDB,
  },
  pool: { min: 0, max: 10 },
});

module.exports = knex;
