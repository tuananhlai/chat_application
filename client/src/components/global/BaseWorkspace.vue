<template>
  <div id="workspace">
    <slot></slot>
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
