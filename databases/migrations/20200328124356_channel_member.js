// Note: What if an user decide to delete himself? What's gonna happen?
exports.up = function(knex) {
  return knex.schema.createTable("channel_member", table => {
    table.integer("user_id").unsigned();
    table.integer("channel_id").unsigned();
    table.primary(["user_id", "channel_id"]);
    table.foreign("user_id").references("user.id");
    table
      .foreign("channel_id")
      .references("channel.id")
      .onDelete("cascade");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("channel_member");
};
