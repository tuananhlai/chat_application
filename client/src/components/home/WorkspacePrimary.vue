<template>
  <div id="workspace-primary">
    <div id="top-nav">
      <h1>#{{ currentChannel.name }}</h1>
      <p>{{ currentChannel.description }}</p>
    </div>
    <div id="messages">
      <message-item
        v-for="message in messages"
        :key="message.id"
        :message="message"
        @showReply="$emit('showReply', message)"
      />
    </div>
    <form @submit.prevent="onSendMessage">
      <input
        type="text"
        id="send-message"
        v-model="newMessage"
        placeholder="Message..."
      />
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
      if (this.channelMessages[message.room.name])
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

#top-nav {
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  padding: 15px;
  min-height: 70px;
  background-color: rgb(253, 253, 253);
}

#top-nav h1 {
  font-size: 1em;
  margin: 0;
}

#top-nav p {
  margin: 0;
  font-size: 0.9em;
  color: rgba(29, 28, 29, 0.7);
}

#messages {
  overflow-y: scroll;
  height: 100%;
  padding: 0 10px;
}
form {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 10px 10px 10px;
}

input[type="text"] {
  width: 100%;
  height: 30px;
  align-self: flex-end;
  font-size: 1em;
  border: 1px solid rgba(30, 30, 30, 0.3);
  padding-left: 5px;
}
</style>
