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
    ...mapGetters(["channelNames", "channelIds", "userChatIds"])
  },
  async mounted() {
    this.$socket.open();
    if (_.isEmpty(this.user)) {
      let { user } = (await UserAPI.verifyToken(this.token)).data.data;
      this.$store.commit("setUser", user);
    }
    this.$socket.emit(event.IDENTIFY_SOCKET, this.user.id);
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

    UserAPI.getPersonalChat(this.token).then(({ data }) => {
      let userChats = data.data;
      this.$store.commit("setUserChats", userChats);
      this.$store.commit("initializeUserChats", this.userChatIds);
    });
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
