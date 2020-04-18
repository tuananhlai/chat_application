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
    token: null
  },
  mutations: {
    changeRoom: (state, newChannel) => {
      state.currentChannel = newChannel;
    },
    addMessage: (state, newMessage) => {
      state.messages[newMessage.room.name].push(newMessage);
    },
    initializeMessages: (state, {channelName, messages}) => {
      if (state.messages[channelName].length !== 0) return;
      state.messages[channelName] = messages;
    },
    initializeChannels: (state, channelNames) => {
      for (let channelName of channelNames) {
        Vue.set(state.messages, channelName, []);
      }
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
    changeRoomAndGetMessages({commit, getters, state}, newChannel) {
      if (state.messages[newChannel.name].length !== 0) {
        commit("changeRoom", newChannel);
        return;
      }
      ChannelAPI.getMessagesInChannel(state.token, newChannel.id)
        .then(({ data }) => {
          let messages = data.data;
          commit("initializeMessages", {
            channelName: newChannel.name,
            messages
          });
          commit("changeRoom", newChannel);
        })
        .catch(console.error);
    }
  },
  getters: {
    getCurrentChannelMessages: state => {
      return state.messages[state.currentChannel.name];
    }
  },
  modules: {}
});

/*
messages: {
roomId: []
 */
