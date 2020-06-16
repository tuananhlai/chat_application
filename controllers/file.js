const fileController = {};
const File = require("../models/File");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { file } = require("../config/constants");

fileController.addFile = ({ name, buffer, type }) => {
  let [fileType, fileExt] = type.split("/"); // parse mime type to get file extension
  let relativeFileDirectory = `/${file.UPLOAD_FILE_LOCATION}/${uuidv4()}`;
  let relativePath = `${relativeFileDirectory}/${name}`;
  let fileDirectory = path.join(__dirname, "..", relativeFileDirectory);
  let filePath = path.join(__dirname, "..", relativePath);
  try {
    fs.mkdirSync(fileDirectory, { recursive: true });
    fs.writeFileSync(filePath, buffer);
  } catch (err) {
    throw err;
  }
  let newFile = File.fromJson({
    name,
    size: buffer.byteLength,
    type: fileType,
    path: relativePath
  });
  return File.query().insert(newFile);
};
module.exports = fileController;
