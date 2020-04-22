exports.up = function(knex) {
  return knex.schema.createTable("message", table => {
    table.charset("utf8mb4").collate("utf32_vietnamese_ci");
    table.increments("id").primary();
    table.text("content").notNullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .integer("channel_id")
      .unsigned()
      .notNullable();
    table
      .integer("sender_id")
      .unsigned()
      .notNullable();
    table.integer("master_message_id").unsigned();
    table
      .foreign("master_message_id")
      .references("message.id")
      .onDelete("cascade");
    table.foreign("channel_id").references("channel.id");
    table.foreign("sender_id").references("user.id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("message");
};
