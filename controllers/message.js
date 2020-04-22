const messageController = {};
const Message = require("../models/Message");
messageController.addMessage = ({content, created_at, sender_id, channel_id, master_message_id}) => {
  let message = Message.fromJson({
    content,
    created_at,
    sender_id,
    channel_id,
    master_message_id
  });
  return Message.query().insert(message);
}
module.exports = messageController;