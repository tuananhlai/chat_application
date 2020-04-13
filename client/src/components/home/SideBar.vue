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
      this.$store.dispatch("changeRoomAndGetMessages", channel);
    }
  },
  computed: {},
  created() {
    // initialize messages for channel 0
  }
};
</script>

<style scoped>
#side-bar {
  display: flex;
  flex-direction: column;
  width: 15em;
  background-color: indigo;
}

button {
  all: unset;
  color: white;
  text-align: center;
}

button:hover {
  background-color: lightgray;
  color: black;
}
</style>
