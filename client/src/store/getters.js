const getters = {
  getCurrentChannelMessages: (state) => {
    return state.messages[state.currentChannel.id];
  },
  getCurrentChannelMembers: (state) => {
    return state.members[state.currentChannel.id];
  },
  channelNames: (state) => {
    return state.channels.map((channel) => channel.name);
  },
  channelIds: (state) => {
    return state.channels.map((channel) => channel.id);
  },
  userChatIds: (state) => {
    return state.userChats.map((userChat) => userChat.id);
  },
  getCurrentUserChatMessages: (state) => {
    return state.personalMessages[state.currentChannel.id];
  }
};

export default getters;
