const fileController = {};
const File = require("../models/File");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4} = require("uuid");

fileController.addFileSync = async ({name, buffer, type}) => {
  let [fileType, fileExt] = type.split("/"); // parse mime type to get file extension
  let generatedFullName = uuidv4() + "." + fileExt;
  let relativePath = `/public/images/${generatedFullName}`;
  let filePath = path.join(__dirname, "..", "public", "images", `${generatedFullName}`);
  let networkPath = `${process.env.SERVER_URL || "http://localhost:3000"}/public/images/${generatedFullName}`;
  try {
    fs.writeFileSync(filePath, buffer);
  } catch (err) {
    throw err;
  }

  let newFile = File.fromJson({
    name,
    size: buffer.byteLength,
    type: fileType,
    "path": relativePath
  });
  newFile.id = (await File.query().insert(newFile)).id;
  return newFile;
}
module.exports = fileController;
