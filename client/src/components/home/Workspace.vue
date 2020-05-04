<template>
  <div id="workspace">
    <workspace-primary
      :socket="socket"
      @showReply="showReply"
      @toggleChannelDetails="toggleChannelDetails"
    />
    
    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave">

    <workspace-secondary-channel-details
      v-show="show === 'channelDetails'"
      @close="closeSecondaryWorkspace"
    />
    </transition>

    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave">
    <workspace-secondary-replies
      :thread-master="threadMaster"
      v-show="show === 'reply'"
      @close="closeSecondaryWorkspace"
    />
    </transition>
    
  </div>
</template>

<script>
import WorkspacePrimary from "./WorkspacePrimary";
import WorkspaceSecondaryChannelDetails from "./WorkspaceSecondaryChannelDetails";
import WorkspaceSecondaryReplies from "./WorkspaceSecondaryReplies";

export default {
  name: "Workspace",
  components: {
    WorkspaceSecondaryChannelDetails,
    WorkspacePrimary,
    WorkspaceSecondaryReplies
  },
  props: ["socket"],
  data() {
    return {
      show: "",
      threadMaster: null
    };
  },
  methods: {
    showReply(message) {
      this.show = "reply";
      this.threadMaster = message;
    },
    toggleChannelDetails() {
      this.show = this.show === "channelDetails" ? "" : "channelDetails";
    },
    closeSecondaryWorkspace() {
      this.show = "";
    },
    enter(el) {
      el.style.width = 0;
      
      getComputedStyle(el);

      setTimeout(() => {
        el.style.width = '300px';
      });
      
    },
    afterEnter(el) {
      el.style.width = '300px';
    },
    leave(el) {
      el.style.width = getComputedStyle(el).width;

      getComputedStyle(el);

      setTimeout(() => {
        el.style.width = 0;
      });
    }
  }
};
</script>

<style scoped>
#workspace {
  width: 100%;
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: row;
}

.expand-enter-active {
  transition: width .5s ease-in-out;
}

.expand-leave-active {
  transition: width .5s ease-in-out;
  overflow: hidden;
}


</style>
