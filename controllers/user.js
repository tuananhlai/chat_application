const userController = {};
const User = require("../models/User");
const Channel = require("../models/Channel");
const { errorMessage } = require("../config/constants");

userController.getAll = () => {
  return User.query().modify("basicInfos");
};
userController.findAll = (key, operator, value) => {
  return User.query()
    .modify("basicInfos")
    .where(key, operator, value);
};

userController.findBy = (key, value) => {
  return User.query().findOne(key, value);
};

userController.getUserById = (id) => {
  return User.query().findById(id);
};

userController.addUser = ({ name, email, password }) => {
  let newUser = User.fromJson({
    name,
    password,
    email
  });
  return User.query().insert(newUser);
};

userController.findByEmail = (email, password) => {
  if (!email || !password) {
    throw new Error(errorMessage.NO_EMAIL_OR_PASSWORD);
  }
  return User.query()
    .select("id", "name", "email", "password")
    .findOne({ email });
};

userController.joinChannel = ({ channelId, userId }) => {
  if (!channelId || !userId)
    throw new Error(errorMessage.INSUFFICIENT_USER_INFO);
  return User.relatedQuery("belongToGroup")
    .for(userId)
    .relate(channelId);
};

userController.leaveChannel = ({ channelId, userId }) => {
  if (!channelId || !userId)
    throw new Error(errorMessage.INSUFFICIENT_USER_INFO);
  return User.relatedQuery("belongToGroup")
    .for(userId)
    .unrelate()
    .where("id", channelId);
};

userController.getChannelList = (user) => {
  return user.$relatedQuery("belongToGroup");
};

userController.getUnjoinedChannelList = (user_id) => {
  return Channel.query().whereNotIn(
    "id",
    User.relatedQuery("belongToGroup")
      .for(user_id)
      .select("id")
  );
};

userController.updateInfos = ({ user_id, name, email, password }) => {
  return User.query()
    .findById(user_id)
    .patch({
      name,
      email,
      password
    });
};

userController.User = User;

module.exports = userController;
