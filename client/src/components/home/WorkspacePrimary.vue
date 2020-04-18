<template>
  <div id="workspace-primary">
    <div id="messages">
      <message-item
        v-for="message in messages"
        :key="message.id"
        :message="message"
        @showReply="$emit('showReply', message)"
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
</template>

<script>
import MessageItem from "./MessageItem";
import { mapGetters, mapState } from "vuex";

export default {
  name: "WorkspacePrimary",
  components: {
    MessageItem
  },
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
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
    ...mapState({
      currentChannel: "currentChannel",
      channelMessages: "messages"
    }),
    ...mapGetters({
      messages: "getCurrentChannelMessages"
    })
  },
  mounted() {
    let messageList = this.$el.querySelector("#messages");

    this.socket.on("message", message => {
      console.log(message);
      if (this.channelMessages[message.room.name].length !== 0)
        this.$store.commit("addMessage", message);

      this.$nextTick(function() {
        messageList.scrollTop = messageList.scrollHeight;
      });
    });
  }
};
</script>

<style scoped>
#workspace-primary {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
#messages {
  overflow-y: scroll;
  height: 100%;
}
form {
  width: 100%;
  display: flex;
  flex-direction: row;
}

input[type="text"] {
  width: 100%;
  height: 30px;
  align-self: flex-end;
}
</style>
