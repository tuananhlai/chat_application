exports.up = function(knex) {
  return knex.schema.createTable("channel", table => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("channel");
};
