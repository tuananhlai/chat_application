import ChannelAPI from "../lib/channel";
import UserAPI from "../lib/user";

const actions = {
  changeAndSetupRoom({ commit, getters, state }, newChannel) {
    if (state.messages[newChannel.id]) {
      commit("setCurrentChannel", newChannel);
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
      .then((responses) => {
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
        commit("setCurrentChannel", newChannel);
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
  },
  changeAndSetupPersonalChat({ state, commit }, newPersonalChat) {
    if (state.personalMessages[newPersonalChat.id]) {
      commit("setCurrentUserChat", newPersonalChat);
      return;
    }
    UserAPI.getPersonalChatMessages(state.token, newPersonalChat.id)
      .then(({ data }) => {
        let chatMessages = data.data;
        commit("initializePersonalMessages", {
          messages: chatMessages,
          userChatId: newPersonalChat.id
        });
        commit("setCurrentUserChat", newPersonalChat);
      })
      .catch(console.error);
  },
  SOCKET_chatMessage({ state, commit }, message) {
    if (state.messages[message.room.id]) commit("addMessage", message);
  },
  SOCKET_replyMessage({ state, commit }, reply) {
    // TODO: find another way to get threadMaster index in state.messages
    let threadMasterIndex = state.messages[reply.room.id].findIndex(
      (message) => message.id === reply.replyToMessageId
    );
    if (threadMasterIndex !== -1)
      commit("addMessageReplies", {
        newReply: reply,
        threadMasterIndex
      });
  },
  SOCKET_personalChatMessage({ state, commit }, newMessage) {
    // if (message.receiver.id === state.user.id) commit("addPersonalMessage", {user_id: sender.id})
    // else -> day la ack message -> commit("...", {user_id: receiver.id})
    let { sender, receiver } = newMessage;
    if (newMessage.receiver.id === state.user.id)
      commit("addPersonalMessage", {
        newMessage,
        userChatId: sender.id
      });
    else {
      commit("addPersonalMessage", {
        newMessage,
        userChatId: receiver.id
      });
    }
  }
};

export default actions;
