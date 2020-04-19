exports.up = function(knex) {
  return knex.schema.createTable("user", table => {
    table.charset("utf8mb4").collate("utf32_vietnamese_ci");
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table
      .string("email", 100)
      .unique()
      .notNullable();
    // table
    //   .string("avatar_src", 100)
    //   .notNullable()
    //   .defaultTo("/avatars/placeholder.jpg");
    table.string("password", 50).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
