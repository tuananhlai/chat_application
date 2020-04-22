import Vue from "vue";
import Vuex from "vuex";
import ChannelAPI from "../lib/channel";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    currentChannel: {
      id: null,
      name: null,
      created_at: null
    },
    messages: {},
    members: {},
    channels: [],
    token: null,
  },
  mutations: {
    changeRoom: (state, newChannel) => {
      state.currentChannel = newChannel;
    },
    addMessage: (state, newMessage) => {
      state.messages[newMessage.room.id].push(newMessage);
    },
    addMessageReplies: (state, {newReply, threadMasterIndex}) => {
      state.messages[newReply.room.id][threadMasterIndex].replies.push(newReply);
    },
    addChannel: (state, channel) => {
      state.channels.push(channel);
      Vue.set(state.messages, channel.id, null);
      Vue.set(state.members, channel.id, null);
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
      channelIds.map(channelId =>
        Vue.set(state.messages, channelId, null)
      );
      channelIds.map(channelId =>
        Vue.set(state.members, channelId, null)
      );
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
  },
  actions: {
    changeAndSetupRoom({ commit, getters, state }, newChannel) {
      if (state.messages[newChannel.id]) {
        commit("changeRoom", newChannel);
        return;
      }
      let getMessageInChannel = ChannelAPI.getMessagesInChannel(
        state.token,
        newChannel.id
      );
      let getMemberInChannel = ChannelAPI.getMembersInChannel(
        state.token,
        newChannel.id
      );

      Promise.all([getMessageInChannel, getMemberInChannel])
        .then(responses => {
          let messages = responses[0].data.data;
          let channelMembers = responses[1].data.data;
          commit("initializeMessages", {
            channelId: newChannel.id,
            messages
          });
          commit("initializeChannelMembers", {
            channelId: newChannel.id,
            channelMembers
          });
          commit("changeRoom", newChannel);
        })
        .catch(console.error);
    },
    resetState({commit}) {
      commit("setCurrentChannel", {
        id: null,
        name: null,
        created_at: null
      });
      commit("setMembers", {});
      commit("setUser", {});
      commit("setToken", null);
      commit("setMessages", {});
      commit("setChannels", []);
    }
  },
  getters: {
    getCurrentChannelMessages: state => {
      return state.messages[state.currentChannel.id];
    },
    getCurrentChannelMembers: state => {
      return state.members[state.currentChannel.id];
    },
    channelNames: state => {
      return state.channels.map(channel => channel.name);
    },
    channelIds: state => {
      return state.channels.map(channel => channel.id);
    }
  },
  modules: {}
});

/*
messages: {
roomId: []
 */
