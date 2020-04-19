<template>
  <div id="workspace-secondary-details">
    <div id="top-nav">
      <div id="top-nav-title">
        <h1>Details</h1>
        <h2>#{{this.currentChannel.name}}</h2>
      </div>
      <button id="close-btn"><i class="fas fa-times"></i></button>
    </div>
    <div id="content">
      <div id="content__action">
        <button title="Add Member To This Channel">
          <i class="fas fa-user-plus"></i>
          Add
        </button>
        <button title="Find messages">
          <i class="fas fa-search"></i>
          Find
        </button>
      </div>
      <div id="content__option">
        <button type="button" class="dropdown-button">
          <span>About</span>
          <i class="fas fa-angle-right" />
        </button>
        <button type="button" class="dropdown-button">
          Members
          <i class="fas fa-angle-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "WorkspaceSecondaryChannelDetails",
  data() {
    return {
      showAbout: false,
      showMembers: false
    };
  },
  computed: {
    ...mapState(["currentChannel"]),
    ...mapGetters(["getCurrentChannelMembers"])
  }
};
</script>

<style scoped>
button {
  border: none;
  outline: 0;
}

button:hover {
  cursor: pointer;
}

#workspace-secondary-details {
  flex: 0 0 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

#top-nav {
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  padding: 15px;
  height: 70px;
  background-color: rgb(253, 253, 253);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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

#content__action {
  display: flex;
  justify-content: center;
  align-content: center;
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
}

#content__action button {
  margin: 10px;
  width: 50px;
  height: 50px;
  background-color: rgba(30, 30, 30, 0.05);
  border-radius: 50%;
  font-size: 12px;
}

#content__action button:hover {
  background-color: rgba(30, 30, 30, 0.13);
}

.dropdown-button {
  background-color: white;
  /* border: 0.1px solid gray; */
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  height: fit-content;
  padding: 15px;
  width: 100%;
  text-align: left;
  outline: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
