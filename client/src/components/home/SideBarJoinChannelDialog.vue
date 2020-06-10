<template>
  <div id="join-channel-trigger" @click.stop>
    <button id="join-channel-btn" @click="show = true">
      <i class="fas fa-plus" />
    </button>
    <BaseDialog :active.sync="show">
      <div id="join-channel-dialog-container">
        <h1>Join Channel</h1>
        <form @submit.prevent>
          <div v-for="(channel, index) in unjoinedChannels" :key="channel.id" class="channel-item">
            <div>
              <h1>{{ channel.name }}</h1>
              <p>{{ channel.description || "No description" }}</p>
            </div>
            <button @click="onJoinChannel(channel, index)">Join</button>
          </div>
        </form>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
import BaseDialog from "../global/BaseDialog";
import UserAPI from "../../lib/user";
import { mapState } from "vuex";
export default {
  name: "SideBarJoinChannelDialog",
  components: { BaseDialog },
  props: {},
  data() {
    return {
      show: false,
      unjoinedChannels: []
    };
  },
  methods: {
    onJoinChannel(channel, index) {
      console.log("Joining..." + channel.name);
      this.$socket.emit("joinNew", { channel, user: this.user });
      this.unjoinedChannels.splice(index, 1);
    },
    getUnjoinedChannelList() {
      //   console.log("Getting Unjoined Channel List.");
      UserAPI.getUnjoinedChannelList(this.token)
        .then(({ data }) => {
          this.unjoinedChannels = data.data;
        })
        .catch(console.error);
    }
  },
  watch: {
    show(newValue) {
      if (newValue === true) this.getUnjoinedChannelList();
    }
  },
  sockets: {
    joinResult({ success, channel }) {
      if (!success) console.error("Cannot join channel.");
      this.$store.commit("addChannel", channel);
    }
  },
  computed: mapState(["token", "user"]),
  created() {
    this.getUnjoinedChannelList();
  }
};
</script>

<style scoped>
div#join-channel-trigger {
  display: block;
  float: right;
  color: black;
}
button#join-channel-btn {
  color: white;
  background-color: transparent;
}

button#join-channel-btn:hover {
  /*background-color: rgba(30, 30, 30, 0.13);*/
  cursor: pointer;
}

.channel-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid rgba(30, 30, 30, 0.13);
  margin-bottom: 10px;
}

.channel-item h1 {
  font-size: 0.9em;
  margin: 0;
}

.channel-item p {
  margin: 0;
  font-size: 0.8em;
  color: rgba(29, 28, 29, 0.7);
  font-weight: normal;
}

.channel-item button {
  height: 25px;
  width: 50px;
}

#join-channel-btn {
  display: flex;
  flex-direction: column;
  color: black;
}

#join-channel-dialog-container form {
  display: flex;
  flex-direction: column !important;
  overflow-y: scroll;
  height: 100%;
}
</style>
