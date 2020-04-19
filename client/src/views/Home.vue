<template>
  <div id="home-view">
    <side-bar :channels="channels" />
    <workspace />
  </div>
</template>

<script>
import Workspace from "../components/home/Workspace";
import SideBar from "../components/home/SideBar";
import io from "socket.io-client";
import UserAPI from "../lib/user";
import { mapState } from "vuex";
import Chat from "../lib/chat";

export default {
  name: "Home",
  components: { SideBar, Workspace },
  data() {
    return {
      channels: []
    };
  },
  computed: {
    ...mapState(["token"]),
    channelNames() {
      return this.channels.map(channel => channel.name);
    }
  },
  mounted() {
    this.$socket.open();
    if (!this.token) {
      // leave socket
      return this.$router.push("/");
    }
    UserAPI
      .getChannelList(this.token)
      .then(({ data }) => {
        this.channels = data.data;
        this.$store.commit("initializeChannels", this.channelNames);
        if (this.channels[0]) {
          this.$store.dispatch("changeAndSetupRoom", this.channels[0]);
        }
        this.$socket.emit("setup", { channelNames: this.channelNames });
      })
      .catch(console.error);
  },
  beforeDestroy() {
    this.$socket.close();
  }
};
</script>

<style scoped>
#home-view {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
}
</style>
