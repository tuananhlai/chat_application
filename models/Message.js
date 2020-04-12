const Model = require("objection").Model;
const knex = require("../databases/knex");
Model.knex(knex);

class Message extends Model {
  static get tableName() {
    return "message";
  }

  static get relationMappings() {
    const User = require("./User");
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "message.sender_id",
          to: "user.id"
        }
      }
    };
  }
}

module.exports = Message;
