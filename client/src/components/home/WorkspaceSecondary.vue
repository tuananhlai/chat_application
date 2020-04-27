<template>
  <div id="workspace-secondary">
    <div id="top-nav">
      <div id="top-nav-title">
        <h1>{{ this.title }}</h1>
        <h2>#{{ this.currentChannel.name }}</h2>
      </div>
      <button id="close-btn" @click="$emit('close')" title="Close">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div id="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WorkspaceSecondary",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(["currentChannel"])
  }
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
#workspace-secondary {
  height: 100%;
  background-color: white;
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  min-width: 250px;
}

button#close-btn {
  background-color: transparent;
  width: 30px;
  height: 30px;
  margin-left: auto;
  align-self: flex-start;
}

button#close-btn:hover {
  background-color: rgba(30, 30, 30, 0.13);
}

#top-nav {
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  padding: 15px;
  min-height: 70px;
  background-color: rgb(253, 253, 253);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}

#top-nav-title h1 {
  font-size: 1em;
  margin: 0;

}

#top-nav-title h2 {
  margin: 0;
  font-size: 0.9em;
  font-weight: normal;
  color: rgba(29, 28, 29, 0.7);
}

#content {
  height: 100%;
  overflow-y: scroll;
}
</style>
