<template>
  <div id="side-bar">
    <side-bar-user-info />
    <div id="side-bar__channel-list">
      <div id="channel-title" @click="collapseChannelList = !collapseChannelList">
        <i :class="['fas', collapseChannelList ? 'fa-caret-right' : 'fa-caret-down']"></i>
        Channel
      </div>
      <template v-if="!collapseChannelList">
        <button
          v-for="channel in channels"
          :key="channel.id"
          @click="onClick(channel)"
          :class="[currentChannel.id === channel.id ? 'is-active' : '']"
        >
          # {{ channel.name }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SideBarUserInfo from "./SideBarUserInfo";
export default {
  name: "SideBar",
  components: { SideBarUserInfo },
  props: ["channels"],
  data() {
    return {
      collapseChannelList: false
    }
  },
  methods: {
    onClick(channel) {
      this.$store.dispatch("changeAndSetupRoom", channel);
    }
  },
  computed: mapState(["currentChannel"])
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

button {
  all: unset;
  color: white;
  width: 100%;
  padding: 5px 15px;
}

button:hover {
  background-color: #6698C8;
  color: black;
}

button.is-active {
  background-color: #6698C8;
  color: black;
}
</style>
