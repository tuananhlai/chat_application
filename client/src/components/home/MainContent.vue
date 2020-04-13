<template>
  <div id="main-content">
    <div id="messages">
      <message-item v-for="message in messages" :key="message.id" :message="message" />
    </div>
    <form @submit.prevent="onSendMessage">
      <input type="text" id="send-message" v-model="newMessage" />
      <input type="submit" id="send-button" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MessageItem from "./MessageItem";

export default {
  name: "MainContent",
  components: {
    MessageItem
  },
  props: ["socket"],
  data() {
    return {
      newMessage: ""
    };
  },
  methods: {
    onSendMessage() {
      console.log("message");
      this.socket.emit("message", {
        text: this.newMessage,
        room: this.currentChannel,
        sender: this.$store.state.user
      });
      this.newMessage = "";
    }
  },
  computed: {
    ...mapState(["currentChannel"]),
    ...mapGetters({
      messages: "getCurrentChannelMessages"
    })
  },
  mounted() {
    this.socket.on("message", message => {
      console.log(message);
      this.$store.commit("addMessage", message);
    });
  }
};
</script>

<style scoped>
  #main-content {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 600px;
  }
#messages {
  overflow-y: scroll;
  height: 90%;
}
form {
  position: relative;
  bottom: 2px;
}
</style>
