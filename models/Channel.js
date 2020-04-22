const Model = require("objection").Model;
const knex = require("../databases/knex");
Model.knex(knex);

class Channel extends Model {
  static get tableName() {
    return "channel";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: {type: String, maxlength: 100},
        description: {type: String}
      }
    }
  }

  static get relationMappings() {
    const User = require("./User");
    return {
      member: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "channel.id",
          through: {
            from: "channel_member.channel_id",
            to: "channel_member.user_id"
          },
          to: "user.id"
        }
      }
    };
  }
}

module.exports = Channel;
