const channelController = {};
const Message = require("../models/Message");
const Channel = require("../models/Channel")

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

channelController.getChannelMember = channelId => {
  return Channel.relatedQuery("member").select("id", "name", "email").for(channelId)
}

module.exports = channelController;
