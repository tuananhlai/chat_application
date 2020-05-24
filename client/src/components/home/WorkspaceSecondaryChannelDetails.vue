<template>
  <workspace-secondary title="Details" @close="$emit('close')">
    <div id="content__action">
      <!-- <button title="Add Member To This Channel" @click="onAddMembers">
        <i class="fas fa-user-plus"></i>
        Add
      </button> -->
      <add-user-dialog />
      <find-message-dialog />
    </div>
    <div id="content__option">
      <workspace-secondary-dropdown title="About">
        <div id="about-content">
          <p>{{ currentChannel.description || "No description" }}</p>
          <p>{{ currentChannel.created_at }}</p>
        </div>
      </workspace-secondary-dropdown>
      <workspace-secondary-dropdown title="Members">
        <div id="members-content">
          <button
            v-for="member in getCurrentChannelMembers"
            :key="member.id"
            class="member-btn"
          >{{ member.name }}</button>
        </div>
      </workspace-secondary-dropdown>
      <button id="leave-channel-btn" @click="onLeaveChannel">Leave Channel</button>
    </div>
  </workspace-secondary>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import WorkspaceSecondary from "./WorkspaceSecondary";
import WorkspaceSecondaryDropdown from "./WorkspaceSecondaryDropdown";
import FindMessageDialog from "./FindMessagesDialog";
import AddUserDialog from "./AddUserDialog";

export default {
  name: "WorkspaceSecondaryChannelDetails",
  components: {
    WorkspaceSecondary,
    WorkspaceSecondaryDropdown,
    FindMessageDialog,
    AddUserDialog
  },
  data() {
    return {
      showAbout: false,
      showMembers: false
    };
  },
  methods: {
    ...mapActions(["changeAndSetupRoom", "removeCurrentChannel"]),
    // onAddMembers() {
    //   alert("Tính năng đang được phát triển");
    // },
    // onFind() {
    //   alert("Tính năng đang được phát triển");
    // },
    onLeaveChannel() {
      let confirmLeave = confirm("Are you sure you want to leave this channel");
      if (confirmLeave) {
        this.$socket.emit("leave", {
          channel: this.currentChannel,
          user: this.user
        });
      }
    }
  },
  sockets: {
    leaveResult({ success }) {
      if (success) {
        this.$store.dispatch("removeCurrentChannel");
      }
    }
  },
  computed: {
    ...mapState(["currentChannel", "user"]),
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

/* #content__action button {
  margin: 10px;
  width: 50px;
  height: 50px;
  background-color: rgba(30, 30, 30, 0.05);
  border-radius: 50%;
  font-size: 12px;
}

#content__action button:hover {
  background-color: rgba(30, 30, 30, 0.13);
} */

#about-content {
  padding: 10px 10px 10px 20px;
  font-size: 0.8em;
  background-color: rgba(30, 30, 30, 0.05);
}

#members-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(250, 250, 250, 0.3);
}
.member-btn {
  padding: 5px 10px 5px 20px;
  font-size: 0.9em;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  text-align: left;
}

.member-btn:hover {
  background-color: #2b53ba;
  color: white;
}

button#leave-channel-btn {
  color: firebrick;
  text-align: center;
  width: 100%;
  background-color: rgba(30, 30, 30, 0.05);
  padding: 10px;
  font-weight: bold;
  margin-top: 10px;
  border-radius: 5px;
}

button#leave-channel-btn:hover {
  background-color: rgba(30, 30, 30, 0.13);
}
</style>
