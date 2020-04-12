const messageController = {};
const Message = require("../models/Message");
messageController.addMessage = (newMessage) => {
  let message = {
    content: newMessage.content,
    created_at: newMessage.created_at,
    sender_id: newMessage.sender_id,
    channel_id: newMessage.channel_id
  }
  return Message.query().insert(message);
}
module.exports = messageController;