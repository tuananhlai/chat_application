<template>
  <div id="home-view">
    <SideBar :channels="channels" />
    <MainContent :socket="socket" />
  </div>
</template>

<script>
import MainContent from "../components/home/MainContent";
import SideBar from "../components/home/SideBar";
import io from "socket.io-client";
import UserAPI from "../lib/user";
import { mapState } from "vuex";
import Chat from "../lib/chat";

export default {
  name: "Home",
  components: { SideBar, MainContent },
  data() {
    return {
      socket: io.connect("http://localhost:3000"),
      channels: []
    };
  },
  computed: {
    ...mapState(["token"]),
    channelNames() {
      return this.channels.map(channel => channel.name);
    }
  },
  created() {
    if (!this.token) {
      // leave socket
      return this.$router.push("/");
    }
    UserAPI
      .getChannelList(this.token)
      .then(({ data }) => {
        this.channels = data.data;
        this.$store.commit("initializeChannels", this.channelNames);
        // this.$store.commit("changeRoom", this.channels[0]); // what if they hadn't join any room
        this.socket.emit("setup", { channels: this.channelNames });
      })
      .catch(console.error);
  },
  beforeDestroy() {
    this.socket.close();
  }
};
</script>

<style scoped>
#home-view {
  display: flex;
  flex-direction: row;
}
</style>
