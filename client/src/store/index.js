import Vue from "vue";
import Vuex from "vuex";

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
    }
  },
  actions: {},
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
