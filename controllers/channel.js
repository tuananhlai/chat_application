const channelController = {};
const Message = require("../models/Message");

channelController.getMessageAndSenderInChannel = channelId => {
  return Message.query()
    .select("id", "content as text", "created_at")
    .withGraphFetched("sender(selectBasicInfo)")
    .modifiers({
      selectBasicInfo(builder) {
        builder.select("id", "name", "email");
      }
    })
    .where("channel_id", channelId);
};

module.exports = channelController;
