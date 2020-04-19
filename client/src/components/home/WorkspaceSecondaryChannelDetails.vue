<template>
  <workspace-secondary title="Details">
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
  </workspace-secondary>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import WorkspaceSecondary from "./WorkspaceSecondary";
export default {
  name: "WorkspaceSecondaryChannelDetails",
  components: {WorkspaceSecondary},
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
