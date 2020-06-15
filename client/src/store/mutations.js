import Vue from "vue";

const mutations = {
  changeRoom: (state, newChannel) => {
    state.currentChannel = newChannel;
  },
  addMessage: (state, newMessage) => {
    if (state.messages[newMessage.room.id])
      state.messages[newMessage.room.id].push(newMessage);
  },
  addMessageReplies: (state, { newReply, threadMasterIndex }) => {
    state.messages[newReply.room.id][threadMasterIndex].replies.push(newReply);
  },
  addChannel: (state, channel) => {
    state.channels.push(channel);
    Vue.set(state.messages, channel.id, null);
    Vue.set(state.members, channel.id, null);
  },
  removeChannelByIndex: (state, { channelIndex }) => {
    state.channels.splice(channelIndex, 1);
  },
  initializeMessages: (state, { channelId, messages }) => {
    if (state.messages[channelId]) return;
    state.messages[channelId] = messages;
  },
  initializeChannelMembers: (state, { channelId, channelMembers }) => {
    if (state.members[channelId]) return;
    state.members[channelId] = channelMembers;
  },
  initializeChannels: (state, channelIds) => {
    channelIds.map((channelId) => Vue.set(state.messages, channelId, null));
    channelIds.map((channelId) => Vue.set(state.members, channelId, null));
  },
  removeChannelMessages: (state, channel_id) => {
    delete state.messages[channel_id];
  },
  removeChannelMembers: (state, channel_id) => {
    delete state.members[channel_id];
  },
  setUser: (state, user) => {
    state.user = user;
  },
  setToken: (state, token) => {
    state.token = token;
  },
  setMessages: (state, messages) => {
    state.messages = messages;
  },
  setMembers: (state, members) => {
    state.members = members;
  },
  setCurrentChannel: (state, currentChannel) => {
    state.currentChannel = { ...currentChannel, type: "channel" };
  },
  setCurrentUserChat: (state, currentUserChat) => {
    state.currentChannel = { ...currentUserChat, type: "userChat" };
  },
  setChannels: (state, channels) => {
    state.channels = channels;
  },
  setUserChats: (state, userChats) => {
    state.userChats = userChats;
  },
  initializeUserChats: (state, userChatIds) => {
    userChatIds.map((id) => Vue.set(state.personalMessages, id, null));
  },
  addPersonalMessage: (state, { newMessage, userChatId }) => {
    let messageWithUser = state.personalMessages[userChatId];
    if (messageWithUser === null)
      // personalMessage has been initialized (past convos)
      return;
    else if (messageWithUser === undefined) {
      // personalMessage hasn't been initialized (new convos)
      state.userChats.push(newMessage.sender);
      Vue.set(state.personalMessages, userChatId, [newMessage]);
    } else {
      state.personalMessages[userChatId].push(newMessage);
    }
  },
  initializePersonalMessages(state, { messages, userChatId }) {
    if (state.personalMessages[userChatId]) return;
    state.personalMessages[userChatId] = messages;
  },
  addUserChat(state, { newUserChat }) {
    state.userChats.push(newUserChat);
    Vue.set(state.personalMessages, newUserChat.id, null);
  },
  addPersonalReplyMessage(
    state,
    { newMessage, threadMasterIndex, userChatId }
  ) {
    state.personalMessages[userChatId][threadMasterIndex].replies.push(
      newMessage
    );
  }
};

export default mutations;
