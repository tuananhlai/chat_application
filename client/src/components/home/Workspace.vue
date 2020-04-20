<template>
  <div id="workspace">
    <workspace-primary
      :socket="socket"
      @toggleReply="toggleReply"
      @toggleChannelDetails="toggleChannelDetails"
    />
    <workspace-secondary-channel-details
      v-show="show === 'channelDetails'"
      @close="closeSecondaryWorkspace"
    />
    <workspace-secondary-replies
      :thread-master="threadMaster"
      v-show="show === 'reply'"
      @close="closeSecondaryWorkspace"
    />
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
    toggleReply(message) {
      this.show = this.show === "reply" ? "" : "reply";
      this.threadMaster = message;
    },
    toggleChannelDetails() {
      this.show = this.show === "channelDetails" ? "" : "channelDetails";
    },
    closeSecondaryWorkspace() {
      this.show = "";
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
</style>
