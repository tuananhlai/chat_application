module.exports = {
  baseURL: "http://127.0.0.1:3000",
  loginAPI: {
    authorize: "/user/login"
  },
  userAPI: {
    channelList: "/user/channel-list"
  },
  channelAPI: {
    getMessage: "/channel/message"
  }
};
