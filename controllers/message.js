const messageController = {};
const Message = require("../models/Message");
const FileController = require("../controllers/file");
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

module.exports = messageController;
