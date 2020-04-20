const channelController = {};
const Message = require("../models/Message");
const Channel = require("../models/Channel")

channelController.getMessageAndSenderInChannel = channelId => {
  return Message.query()
    .modify("formatForSocketIO")
    .withGraphFetched("[sender(selectBasicInfo), replies(formatForSocketIO).sender(selectBasicInfo)]")
    .modifiers({
      selectBasicInfo(builder) {
        builder.select("id", "name", "email");
      }
    })
    .where("channel_id", channelId)
    .where("master_message_id", null);
};

channelController.getChannelMember = channelId => {
  return Channel.relatedQuery("member").select("id", "name", "email").for(channelId)
}

module.exports = channelController;
