const Model = require("objection").Model;
const knex = require("../databases/knex");
Model.knex(knex);

class PersonalMessage extends Model {
  static get tableName() {
    return "personal_message";
  }

  static modifiers = {
    formatForSocketIO(builder) {
      builder.select("id", "content as text", "created_at");
    }
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content", "receiver_id", "sender_id"],
      properties: {
        content: { type: "string" },
        created_at: { type: ["date", "string"] },
        receiver_id: { type: "number" },
        sender_id: { type: "number" },
        attachment_id: { type: "number" },
        master_personal_message_id: { type: "number" }
      }
    };
  }

  static get relationMappings() {
    const User = require("./User");
    const File = require("./File");
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "personal_message.sender_id",
          to: "user.id"
        }
      },
      replies: {
        relation: Model.HasManyRelation,
        modelClass: PersonalMessage,
        join: {
          from: "personal_message.id",
          to: "personal_message.master_personal_message_id"
        }
      },
      receiver: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "personal_message.receiver_id",
          to: "user.id"
        }
      },
      attachment: {
        relation: Model.HasOneRelation,
        modelClass: File,
        join: {
          from: "personal_message.attachment_id",
          to: "file.id"
        }
      }
    };
  }
}

module.exports = PersonalMessage;
