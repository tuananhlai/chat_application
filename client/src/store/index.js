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
      created_at: null
    },
    messages: {},
    members: {},
    channels: [],
    token: null,
    currentUserChat: null
  },
  mutations,
  actions,
  getters,
  modules: {}
});
