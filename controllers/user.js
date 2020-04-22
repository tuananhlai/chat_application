const userController = {};
const User = require("../models/User");
const Channel = require("../models/Channel");
const { errorMessage } = require("../config/constants");

userController.getAll = () => {
  return User.query();
};
userController.findAll = (key, value) => {
  return User.query().where(key, value);
};

userController.findBy = (key, value) => {
  return User.query().findOne(key, value);
};

userController.getUserById = id => {
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

userController.authenticate = (email, password) => {
  if (!email || !password) {
    throw new Error(errorMessage.NO_EMAIL_OR_PASSWORD);
  }
  return User.query()
    .select("id", "name", "email")
    .findOne({ email, password });
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

userController.getChannelList = user => {
  return user.$relatedQuery("belongToGroup");
};

userController.getUnjoinedChannelList = user_id => {
  return Channel.query().whereNotIn(
    "id",
    User.relatedQuery("belongToGroup")
      .for(user_id)
      .select("id")
  );
};

userController.User = User;

module.exports = userController;
