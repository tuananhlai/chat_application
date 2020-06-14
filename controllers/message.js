const messageController = {};
const Message = require("../models/Message");
const FileController = require("../controllers/file");
const { raw } = require("objection");
const mysql = require("mysql");

messageController.addMessage = ({
  content,
  created_at,
  sender_id,
  channel_id,
  master_message_id,
  attachment_id
}) => {
  let message = Message.fromJson({
    content,
    created_at,
    sender_id,
    channel_id,
    master_message_id,
    attachment_id
  });
  return Message.query().insert(message);
};

messageController.findMessageInChannel = ({ keyword, channel_id }) => {
  return Message.query()
    .modify("formatForSocketIO")
    .where(raw(`match (content) against (? in natural language mode)`, keyword))
    .where("channel_id", channel_id)
    .withGraphFetched("[sender(basicInfos)]");
};

module.exports = messageController;
