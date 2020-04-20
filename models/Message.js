const Model = require("objection").Model;
const knex = require("../databases/knex");
Model.knex(knex);

class Message extends Model {
  static get tableName() {
    return "message";
  }

  static modifiers = {
    formatForSocketIO(builder) {
      builder.select("id", "content as text", "created_at");
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content", "channel_id", "sender_id"],
      properties: {
        content: {type: "string"},
        created_at: {type: ["date", "string"]},
        channel_id: {type: "number"},
        sender_id: {type: "number"},
        master_message_id: {type: "number"}
      }
    }
  }

  static get relationMappings() {
    const User = require("./User");
    const Channel = require("./Channel");
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "message.sender_id",
          to: "user.id"
        }
      },
      replies: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: "message.id",
          to: "message.master_message_id"
        }
      },
      belongToChannel: {
        relation: Model.BelongsToOneRelation,
        modelClass: Channel,
        join: {
          from: "message.channel_id",
          to: "channel.id"
        }
      }
    };
  }
}

module.exports = Message;
