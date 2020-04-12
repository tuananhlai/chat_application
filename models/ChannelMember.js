const Model = require("objection").Model;
const knex = require("../databases/knex");
Model.knex(knex);

class ChannelMember extends Model {
  static get tableName() {
    return "channel_member";
  }

  static get idColumn() {
    return ["user_id", "channel_id"];
  }
}

module.exports = ChannelMember;
