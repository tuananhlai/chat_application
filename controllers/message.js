const messageController = {};
const Message = require("../models/Message");
const FileController = require("../controllers/file");
messageController.addMessage = ({
  content,
  created_at,
  sender_id,
  channel_id,
  master_message_id
}) => {
  let message = Message.fromJson({
    content,
    created_at,
    sender_id,
    channel_id,
    master_message_id
  });
  return Message.query().insert(message);
};

messageController.addMessageWithAttachmentSync = async ({
  content,
  created_at,
  sender_id,
  channel_id,
  master_message_id,
  attachment
}) => {
  let newFile = null;
  if (attachment) {
    newFile = await FileController.addFileSync(attachment);
  }
  let message = Message.fromJson({
    content,
    created_at,
    sender_id,
    channel_id,
    master_message_id,
    attachment_id: newFile ? newFile.id : null
  });
  let newMessage = await Message.query().insert(message);
  let fullPath = newFile
    ? (process.env.SERVER_URL || "http://localhost:3000") + newFile.path
    : null;
  return { id: newMessage.id, path: fullPath, size: newFile ? newFile.size : null };
};
module.exports = messageController;
