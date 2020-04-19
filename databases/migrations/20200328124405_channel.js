exports.up = function(knex) {
  return knex.schema.createTable("channel", table => {
    table.charset("utf8mb4").collate("utf32_vietnamese_ci");
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
    table.text("description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("channel");
};
