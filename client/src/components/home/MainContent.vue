<template>
  <div id="main-content">
    <div id="messages">
      <p
        v-for="message in messages"
        :key="message.id"
      >{{ message.sender.name }}: {{ message.text }}</p>
    </div>
    <form @submit.prevent="onSendMessage">
      <input type="text" id="send-message" v-model="newMessage" />
      <input type="submit" id="send-button" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "MainContent",
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
#messages {
  background-color: beige;
}
#main-content {
  height: 500px;
}
form {
  position: relative;
  bottom: 2px;
}
</style>
