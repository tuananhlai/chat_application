
module.exports = {
  baseURL: process.env.VUE_APP_SERVER_URL || "http://127.0.0.1:3000",
  loginAPI: {
    authorize: "/user/login"
  },
  userAPI: {
    channelList: "/user/channel-list",
    registerUser: "/user/register"
  },
  channelAPI: {
    getMessage: "/channel/message"
  }
};
