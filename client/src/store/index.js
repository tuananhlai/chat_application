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
    token: null
  },
  mutations: {
    changeRoom: (state, newChannel) => {
      state.currentChannel = newChannel;
    },
    addMessage: (state, newMessage) => {
      state.messages[newMessage.room.name].push(newMessage);
    },
    initializeMessages: (state, { channelName, messages }) => {
      if (state.messages[channelName]) return;
      state.messages[channelName] = messages;
    },
    initializeChannelMembers: (state, { channelName, channelMembers }) => {
      if (state.members[channelName]) return;
      state.members[channelName] = channelMembers;
    },
    initializeChannels: (state, channelNames) => {
      channelNames.map(channelName =>
        Vue.set(state.messages, channelName, null)
      );
      channelNames.map(channelName =>
        Vue.set(state.members, channelName, null)
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
    }
  },
  actions: {
    changeAndSetupRoom({ commit, getters, state }, newChannel) {
      if (state.messages[newChannel.name]) {
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

      Promise.all([getMessageInChannel, getMemberInChannel]).then(responses => {
        let messages = responses[0].data.data;
        let channelMembers = responses[1].data.data;
        commit("initializeMessages", {
          channelName: newChannel.name,
          messages
        });
        commit("initializeChannelMembers", {
          channelName: newChannel.name,
          channelMembers
        });
        commit("changeRoom", newChannel);
      }).catch(console.error);
    }
  },
  getters: {
    getCurrentChannelMessages: state => {
      return state.messages[state.currentChannel.name];
    },
    getCurrentChannelMembers: state => {
      return state.members[state.currentChannel.name];
    }
  },
  modules: {}
});

/*
messages: {
roomId: []
 */
