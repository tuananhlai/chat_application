import ChannelAPI from "../lib/channel";

const actions = {
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
  resetState({ commit }) {
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
  },
  removeCurrentChannel({ state, dispatch, commit }) {
    let channelsLength = state.channels.length;
    if (channelsLength === 0) return;
    if (channelsLength === 1) {
      commit("setCurrentChannel", { id: null, name: null, created_at: null });
      commit("setChannels", []);
    } else {
      for (let i = 0; i < channelsLength; i++) {
        if (state.channels[i].id === state.currentChannel.id) {
          let removeChannelId = state.currentChannel.id;
          dispatch(
            "changeAndSetupRoom",
            state.channels[(i + 1) % channelsLength]
          );
          commit("removeChannelMessages", removeChannelId);
          commit("removeChannelMembers", removeChannelId);
          commit("removeChannelByIndex", { channelIndex: i });
          return;
        }
      }
    }
  }
};

export default actions;
