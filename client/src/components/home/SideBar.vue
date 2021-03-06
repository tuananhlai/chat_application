<template>
  <div id="side-bar">
    <side-bar-user-info />
    <div id="side-bar__channel-list">
      <div id="channel-title" @click="collapseChannelList = !collapseChannelList">
        <i :class="dropDownIconClass"></i>
        Channel
        <side-bar-join-channel-dialog />
      </div>
      <transition name="slide">
        <div v-if="!collapseChannelList">
          <button
            v-for="channel in channels"
            :key="channel.id"
            @click="onClick(channel)"
            :class="[
            isCurrentChannel(channel) ? 'is-active' : '',
            'channel-btn'
          ]"
          ># {{ channel.name }}</button>
          <side-bar-create-channel-dialog />
        </div>
      </transition>
    </div>
    <div id="side-bar__channel-list">
      <div id="channel-title" @click="collapseUserChatList = !collapseUserChatList">
        <i :class="dropDownIconClass"></i>
        User
        <side-bar-user-chat-dialog />
      </div>
      <transition name="slide">
        <div v-if="!collapseUserChatList">
          <button
            @click="onClickUserChat(userChat)"
            v-for="userChat in userChats"
            :key="userChat.id"
            :class="[
            isCurrentUserChat(userChat) ? 'is-active' : '',
            'channel-btn'
          ]"
          >{{userChat.name}}</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SideBarUserInfo from "./SideBarUserInfo";
import SideBarJoinChannelDialog from "./SideBarJoinChannelDialog";
import SideBarCreateChannelDialog from "./SideBarCreateChannelDialog";
import SideBarUserChatDialog from "./SideBarUserChatDialog";
export default {
  name: "SideBar",
  components: {
    SideBarJoinChannelDialog,
    SideBarUserInfo,
    SideBarCreateChannelDialog,
    SideBarUserChatDialog
  },
  data() {
    return {
      collapseChannelList: false,
      collapseUserChatList: false
    };
  },
  methods: {
    onClick(channel) {
      if (this.isCurrentChannel(channel)) return;
      this.$store.dispatch("changeAndSetupRoom", channel);
      this.$router.push({
        name: "ChannelChat",
        params: { channelId: channel.id }
      });
    },
    onClickUserChat(userChat) {
      if (this.isCurrentUserChat(userChat)) return;
      this.$store.dispatch("changeAndSetupPersonalChat", userChat);
      this.$router.push({
        name: "UserChat",
        params: { userChatId: userChat.id }
      });
    },
    isCurrentChannel(channel) {
      return (
        this.currentChannel.id === channel.id &&
        this.currentChannel.type === "channel"
      );
    },
    isCurrentUserChat(userChat) {
      return (
        this.currentChannel.id === userChat.id &&
        this.currentChannel.type === "userChat"
      );
    }
  },
  computed: {
    ...mapState(["currentChannel", "channels", "userChats"]),
    dropDownIconClass() {
      return {
        fas: true,
        "fa-caret-right": this.collapseChannelList,
        "fa-caret-down": !this.collapseChannelList
      };
    }
  }
};
</script>

<style scoped>
#side-bar {
  flex: 0 0 260px;
  display: flex;
  flex-direction: column;
  background-color: #303e4d;
}

#side-bar__channel-list {
  padding-top: 15px;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
}

#side-bar__channel-list::-webkit-scrollbar {
  display: none;
}

#channel-title {
  padding-left: 12px;
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
}

.channel-btn {
  all: unset;
  color: white;
  width: 100%;
  padding: 5px 15px;
}

.channel-btn:hover {
  background-color: #1f272f;
  color: white;
}

.channel-btn.is-active {
  background-color: #6698c8;
  color: black;
}

.slide-enter-active {
  transition: all 0.1s;
}

.slide-leave-active {
  transition: all 0.1s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
