const environment = process.env.NODE_ENV || "development";

const options = require("../knexfile")[environment];
const knex = require("knex")(options);

module.exports = knex;
