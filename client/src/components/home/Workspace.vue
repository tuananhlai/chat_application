<template>
  <div id="workspace">
    <div id="workspace-primary">
      <div id="messages">
        <message-item
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
      </div>
      <form @submit.prevent="onSendMessage">
        <input type="text" id="send-message" v-model="newMessage" />
        <input
          type="submit"
          id="send-button"
          value="Submit"
          :disabled="!newMessage"
        />
      </form>
    </div>
    <div id="workspace-secondary" style="display:none"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MessageItem from "./MessageItem";

export default {
  name: "Workspace",
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
      if (this.$store.state.messages[message.room.name].length !== 0)
        this.$store.commit("addMessage", message);

      this.$nextTick(function() {
        let messageList = this.$el.querySelector("#messages");
        messageList.scrollTop = messageList.scrollHeight;
      });
    });
  }
};
</script>

<style scoped>
#workspace {
  width: 100%;
  padding: 10px;
}
#workspace-primary {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 20%;
}
#messages {
  overflow-y: scroll;
  height: 90%;
}
form {
  position: relative;
  bottom: 2px;
  width: 100%;
  display: flex;
  flex-direction: row;
}

input[type="text"] {
  width: 100%;
}
</style>
