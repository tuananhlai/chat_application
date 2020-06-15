<template>
  <div id="workspace">
    <workspace-user-chat-primary @showReply="showReply" />
    <workspace-user-chat-secondary-replies
      v-show="show ==='reply'"
      @close="closeSecondaryWorkspace"
      :threadMaster="threadMaster"
    />
  </div>
</template>

<script>
import WorkspaceUserChatPrimary from "./WorkspaceUserChatPrimary";
import WorkspaceUserChatSecondaryReplies from "./WorkspaceUserChatSecondaryReplies";

export default {
  name: "WorkspaceUserChat",
  components: { WorkspaceUserChatPrimary, WorkspaceUserChatSecondaryReplies },
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
      console.log(this.threadMaster);
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
