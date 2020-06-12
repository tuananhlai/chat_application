module.exports = {
  baseURL: process.env.VUE_APP_SERVER_URL || "http://127.0.0.1:3000",
  loginAPI: {
    authorize: "/user/login"
  },
  userAPI: {
    channelList: "/user/channel-list",
    registerUser: "/user/register",
    getUnjoinedChannels: "/user/unjoined-channel-list",
    verifyToken: "/user/verify-token",
    updatePassword: "/user/update-password"
  },
  channelAPI: {
    getMessage: "/channel/message",
    getMember: "/channel/member",
    getAllChannels: "/channel/get"
  },
  messageAPI: {
    uploadAttachment: "/file/upload",
    findMessage: "/channel/message/find"
  },
  personalChatAPI: {
    getPersonalChats: "/user/personal-chat",
    getPersonalChatMessage: "/user/personal-chat-message"
  }
};
