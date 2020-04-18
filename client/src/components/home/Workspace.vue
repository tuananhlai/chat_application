<template>
  <div id="workspace">
    <workspace-primary :socket="socket" @showReply="showReply"/>
    <div id="workspace-secondary" v-if="showSecondaryWorkspace"></div>
  </div>
</template>

<script>
import WorkspacePrimary from "./WorkspacePrimary";

export default {
  name: "Workspace",
  components: {
    WorkspacePrimary,
  },
  props: ["socket"],
  data() {
    return {
      showSecondaryWorkspace: false
    };
  },
  methods: {
    showReply() {

    }
  }
};
</script>

<style scoped>
#workspace {
  width: 100%;
  padding: 10px;
  height: 100%;
  min-width: 300px;
}
</style>
