import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    currentChannel: {
      id: null,
      name: null,
      created_at: null,
      type: null
    },
    messages: {},
    members: {},
    channels: [],
    token: null,
    workspaceUsers: [],
    userChats: [],
    personalMessages: {}
  },
  mutations,
  actions,
  getters,
  modules: {}
});
