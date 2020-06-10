const personalMessageController = {};
const PersonalMessage = require("../models/PersonalMessage");
const { raw } = require("objection");
const mysql = require("mysql");
const User = require("../models/User");

personalMessageController.addMessage = ({
  content,
  created_at,
  sender_id,
  receiver_id,
  master_message_id,
  attachment_id
}) => {
  let message = PersonalMessage.fromJson({
    content,
    created_at,
    sender_id,
    receiver_id,
    master_message_id,
    attachment_id
  });
  return PersonalMessage.query().insert(message);
};

personalMessageController.getPersonalChats = (user_id) => {
  return User.query()
    .modify("basicInfos")
    .whereIn(
      "id",
      PersonalMessage.knex().raw(
        `(SELECT sender_id from personal_message where receiver_id = ${user_id}) union (select receiver_id from personal_message where sender_id = ${user_id})`
      )
    );
};

personalMessageController.getPersonalChatMessages = (user_id, partner_id) => {
  return PersonalMessage.query()
    .modify("formatForSocketIO")
    .where((builder) =>
      builder.where("sender_id", user_id).where("receiver_id", partner_id)
    )
    .orWhere((builder) =>
      builder.where("sender_id", partner_id).where("receiver_id", user_id)
    )
    .withGraphFetched(
      "[sender(basicInfos), replies(formatForSocketIO).sender(basicInfos), attachment(selectBasicInfos)]"
    );
};

module.exports = personalMessageController;
