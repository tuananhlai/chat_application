const channelController = {};
const Message = require("../models/Message");
const Channel = require("../models/Channel")

channelController.getMessageAndSenderInChannel = channelId => {
  return Message.query()
    .modify("formatForSocketIO")
    .withGraphFetched("[sender(basicInfos), replies(formatForSocketIO).sender(basicInfos)]")
    .where("channel_id", channelId)
    .where("master_message_id", null);
};

channelController.getChannelMember = channelId => {
  return Channel.relatedQuery("member").select("id", "name", "email").for(channelId)
}

channelController.addChannel = ({name, description}) => {
  let newChannel = Channel.fromJson({name, description});
  return Channel.query().insert(newChannel);
}

channelController.getAllChannels = () => {
  return Channel.query();
}

module.exports = channelController;
