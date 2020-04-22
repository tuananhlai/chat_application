<template>
  <div id="home-view">
    <side-bar />
    <workspace />
  </div>
</template>

<script>
import Workspace from "../components/home/Workspace";
import SideBar from "../components/home/SideBar";
import io from "socket.io-client";
import UserAPI from "../lib/user";
import { mapState, mapGetters } from "vuex";
import Chat from "../lib/chat";

export default {
  name: "Home",
  components: { SideBar, Workspace },
  data() {
    return {

    };
  },
  computed: {
    ...mapState(["token", "channels"]),
    ...mapGetters(["channelNames", "channelIds"])
  },
  mounted() {
    this.$socket.open();
    UserAPI.getChannelList(this.token)
      .then(({ data }) => {
        this.$store.commit("setChannels", data.data);
        this.$store.commit("initializeChannels", this.channelIds);
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
