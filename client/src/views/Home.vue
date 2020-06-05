<template>
  <div id="home-view">
    <side-bar />
    <router-view />
  </div>
</template>

<script>
import Workspace from "../components/home/Workspace";
import SideBar from "../components/home/SideBar";
import io from "socket.io-client";
import UserAPI from "../lib/user";
import { mapState, mapGetters } from "vuex";
import Chat from "../lib/chat";
import { event } from "../../../config/constants";
import _ from "lodash";

export default {
  name: "Home",
  components: { SideBar, Workspace },
  data() {
    return {};
  },
  computed: {
    ...mapState(["token", "channels", "user"]),
    ...mapGetters(["channelNames", "channelIds"])
  },
  mounted() {
    this.$socket.open();
    if (_.isEmpty(this.user)) {
      UserAPI.verifyToken(this.token)
        .then(({ data }) => {
          let { user } = data.data;
          this.$store.commit("setUser", user);
        })
        .catch(console.error);
    }
    UserAPI.getChannelList(this.token)
      .then(({ data }) => {
        this.$store.commit("setChannels", data.data);
        console.log("Initializing Channels...");
        this.$store.commit("initializeChannels", this.channelIds);
        this.$socket.emit(event.JOIN_SAVED_CHANNEL, {
          channelNames: this.channelNames
        });
        if (this.channels[0]) {
          this.$store.dispatch("changeAndSetupRoom", this.channels[0]);
          this.$router.push({
            name: "ChannelChat",
            params: {
              channelId: this.channels[0].id
            }
          });
        }
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
