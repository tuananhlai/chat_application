const Model = require("objection").Model;
const knex = require("../databases/knex");
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "user";
  }

  static modifiers = {
    basicInfos(builder) {
      builder.select("id", "name", "email");
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: { type: "string", maxlength: 100 },
        email: { type: "email", maxlength: 100 },
        password: { type: "string", maxlength: 100 }
      }
    };
  }

  static get relationMappings() {
    const Channel = require("./Channel");
    return {
      belongToGroup: {
        relation: Model.ManyToManyRelation,
        modelClass: Channel,
        join: {
          from: "user.id",
          through: {
            from: "channel_member.user_id",
            to: "channel_member.channel_id"
          },
          to: "channel.id"
        }
      }
    };
  }
}

module.exports = User;
