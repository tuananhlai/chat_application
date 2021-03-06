const Model = require("objection").Model;
const knex = require("../databases/knex");
const { regExp } = require("../config/constants");
Model.knex(knex);

class File extends Model {
  static get tableName() {
    return "file";
  }

  async $afterFind() {
    this.path = regExp.URL_REGEX.test(this.path)
      ? this.path
      : (process.env.SERVER_URL || "http://localhost:3000") + this.path;
  }

  async $afterInsert() {
    this.path = regExp.URL_REGEX.test(this.path)
      ? this.path
      : (process.env.SERVER_URL || "http://localhost:3000") + this.path;
  }

  static modifiers = {
    selectPath(builder) {
      return builder.select("path");
    },
    selectBasicInfos(builder) {
      return builder.select("name", "type", "path", "size");
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
        created_at: { type: ["date", "string"] },
        updated_at: { type: ["date", "string"] }
      }
    };
  }

  static get relationMappings() {}
}

module.exports = File;
