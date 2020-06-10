<template>
  <div id="workspace">
    <workspace-user-chat-primary />
  </div>
</template>

<script>
import WorkspaceUserChatPrimary from "./WorkspaceUserChatPrimary";

export default {
  name: "WorkspaceUserChat",
  components: { WorkspaceUserChatPrimary },
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
    toggleUserlDetails() {
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
