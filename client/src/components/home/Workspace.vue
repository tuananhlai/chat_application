<template>
  <div id="workspace">
    <workspace-primary :socket="socket" @showReply="showReply"/>
    <workspace-secondary-channel-details />
  </div>
</template>

<script>
import WorkspacePrimary from "./WorkspacePrimary";
import WorkspaceSecondaryChannelDetails from "./WorkspaceSecondaryChannelDetails";

export default {
  name: "Workspace",
  components: {
    WorkspaceSecondaryChannelDetails,
    WorkspacePrimary,
  },
  props: ["socket"],
  data() {
    return {
      showSecondaryWorkspace: {
        reply: false,
        channelDetails: false
      }
    };
  },
  methods: {
    hideSecondaryWorkspace() {
      for (let key in this.showSecondaryWorkspace) {
        this.showSecondaryWorkspace[key] = false;
      }
    },
    showReply() {
      this.hideSecondaryWorkspace();
      this.showSecondaryWorkspace["reply"] = true;
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
