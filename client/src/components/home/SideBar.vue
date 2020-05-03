<template>
  <div id="side-bar">
    <side-bar-user-info />
    <div id="side-bar__channel-list">
      <div
        id="channel-title"
        @click="collapseChannelList = !collapseChannelList"
      >
        <!-- <i :class="dropDownIconClass"></i> -->
        <i class="fas fa-caret-down"
        :class="{'state':collapseChannelList}"></i>
        Channel
        <side-bar-join-channel-dialog />
      </div>

      <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave">
        <ul v-show="!collapseChannelList" class="channel-list">
          <button
            v-for="channel in channels"
            :key="channel.id"
            @click="onClick(channel)"
            :class="[
              currentChannel.id === channel.id ? 'is-active' : '',
              'channel-btn'
            ]"
          >
            # {{ channel.name }}
          </button>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SideBarUserInfo from "./SideBarUserInfo";
import SideBarJoinChannelDialog from "./SideBarJoinChannelDialog";
export default {
  name: "SideBar",
  components: {SideBarJoinChannelDialog, SideBarUserInfo },
  data() {
    return {
      collapseChannelList: false
    };
  },
  methods: {
    onClick(channel) {
      this.$store.dispatch("changeAndSetupRoom", channel);
    },
    enter(channel) {
      channel.style.height = 'auto';
      const height = getComputedStyle(channel).height;
      channel.style.height = 0;

      getComputedStyle(channel);

      setTimeout(() => {
        channel.style.height = height;
      });
    },
    afterEnter(channel) {
      channel.style.height = 'auto';
    },
    leave(channel) {
      channel.style.height = getComputedStyle(channel).height;

      getComputedStyle(channel);

      setTimeout(() => {
        channel.style.height = 0;
      });
    }
  }, 
  computed: {
    ...mapState(["currentChannel", "channels"])
    // dropDownIconClass() {
    //   return {
    //     fas: true,
    //     "fa-caret-right": this.collapseChannelList,
    //     "fa-caret-down": !this.collapseChannelList
    //   };
    // }
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

.fa-caret-down {
  /* position: absolute; */
  transition: transform .5s ease-in-out;
}

.state {
  transform: rotateZ(-90deg);
}

.channel-btn {
  all: unset;
  color: white;
  width: 100%;
  padding: 5px 15px;
}

.channel-btn:hover {
  background-color: #6698c8;
  color: black;
}

.channel-btn.is-active {
  background-color: #6698c8;
  color: black;
}

.channel-list {
  margin-left: -40px;
}

.expand-enter-active, .expand-leave-active {
  transition: height .5s ease-in-out;
  overflow: hidden;
}

</style>
