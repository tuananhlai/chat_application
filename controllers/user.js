const userController = {};
const User = require("../models/User");
const { errorMessage } = require("../config/constants");

userController.getAll = () => {
  return User.query();
}
userController.findAll = (key, value) => {
  return User.query().where(key, value);
};

userController.findBy = (key, value) => {
  return User.query().findOne(key, value);
};

userController.getUserById = id => {
  return User.query().findById(id);
};

userController.authenticate = (email, password) => {
  if (!email || !password) {
    throw new Error(errorMessage.NO_EMAIL_OR_PASSWORD);
  }
  return User.query().select("id", "name", "email").findOne({ email, password });
};

userController.getChannelList = (user) => {
  return user.$relatedQuery("belongToGroup");
}

userController.User = User;

module.exports = userController;
