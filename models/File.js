const Model = require("objection").Model;
const knex = require("../databases/knex");
Model.knex(knex);

class File extends Model {
  static get tableName() {
    return "file";
  }

  async $afterFind() {
    this.path = (process.env.SERVER_URL || "http://localhost:3000") + this.path;
  }

  static modifiers = {
    selectPath(builder) {
      return builder.select("path");
    }
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["path", "type", "size"],
      properties: {
        name: { type: "string" },
        path: { type: "string", maxlength: 500 },
        type: { type: "string", maxlength: 20 },
        size: { type: "integer" },
        created_at: { type: ["date", "string"]},
        updated_at: { type: ["date", "string"]}
      }
    };
  }

  static get relationMappings() {}
}

module.exports = File;
