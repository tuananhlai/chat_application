import Vue from "vue";

const mutations = {
  changeRoom: (state, newChannel) => {
    state.currentChannel = newChannel;
  },
  addMessage: (state, newMessage) => {
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
    channelIds.map(channelId => Vue.set(state.messages, channelId, null));
    channelIds.map(channelId => Vue.set(state.members, channelId, null));
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
    state.currentChannel = currentChannel;
  },
  setChannels: (state, channels) => {
    state.channels = channels;
  }
};

export default mutations;
