<template>
  <div id="side-bar">
    <button
      v-for="channel in channels"
      :key="channel.id"
      @click="onClick(channel)"
    >
      #{{ channel.name }}
    </button>
  </div>
</template>

<script>
import ChannelAPI from "../../lib/channel";
export default {
  name: "SideBar",
  props: ["channels"],
  methods: {
    onClick(channel) {
      this.$store.commit("changeRoom", channel);
      ChannelAPI.getMessagesInChannel(this.$store.state.token, channel.id).then(
        ({ data }) => {
          let messages = data.data;
          this.$store.commit("initializeMessages", {channelName: channel.name, messages});
        }
      ).catch(console.error);
    }
  },
  computed: {}
};
</script>

<style scoped>
#side-bar {
  display: flex;
  flex-direction: column;
  padding: 2em;
}
</style>
