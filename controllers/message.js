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
  return Message.query().insertAndFetch(message);
}
module.exports = messageController;