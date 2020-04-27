<template>
  <div id="workspace-primary">
    <div id="top-nav">
      <div id="top-nav-text">
        <h1>#{{ currentChannel.name }}</h1>
        <p>
          <i class="fas fa-user-alt" /> {{ numberOfMembers }} |
          {{ currentChannel.description }}
        </p>
      </div>
      <button @click="$emit('toggleChannelDetails')" title="Details"><i class="fas fa-info-circle"></i></button>
    </div>
    <div id="messages">
      <message-item
        v-for="(message, index) in messages"
        :key="message.id"
        :message="message"
        @showReply="$emit('showReply', {message, index})"
      />
    </div>
    <form @submit.prevent="onSendMessage">
      <textarea
        id="send-message"
        v-model="newMessage"
        placeholder="Message..."
        rows="2"
      />
      <button
        title="Send message."
        type="submit"
        id="send-button"
        :disabled="!newMessage"
      >
        <i class="fas fa-paper-plane"></i>
      </button>
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

  },
  data() {
    return {
      newMessage: ""
    };
  },
  methods: {
    onSendMessage() {
      console.log("message");
      this.$socket.emit("chatMessage", {
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
      messages: "getCurrentChannelMessages",
      getCurrentChannelMembers: "getCurrentChannelMembers"
    }),
    numberOfMembers() {
      if (this.getCurrentChannelMembers)
        return this.getCurrentChannelMembers.length;
      return 0;
    }
  },
  sockets: {
    chatMessage: function (message) {
      console.log(message);
      let messageList = this.$el.querySelector("#messages");
      if (this.channelMessages[message.room.id])
        this.$store.commit("addMessage", message);
      this.$nextTick(function() {
        messageList.scrollTop = messageList.scrollHeight;
      });
    }
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
  border-right: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  padding: 15px;
  min-height: 70px;
  background-color: rgb(253, 253, 253);
  display: flex;
  flex-direction: row;
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

#top-nav > button {
  width: 30px;
  height: 30px;
  margin-left: auto;
  background-color: transparent;
  font-size: 15px;
}

#top-nav > button:hover {
  background-color: rgba(30, 30, 30, 0.13);
  cursor: pointer;
}

#top-nav-text {
  line-height: 1.4em;
}

#top-nav-text .fa-user-alt {
  font-size: 0.9em;
}

#messages {
  overflow-y: scroll;
  height: 100%;
}
form {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 0 10px 10px;
}

form > textarea {
  width: 100%;
  height: 30px;
  font-size: 0.95em;
  border: 1px solid rgba(30, 30, 30, 0.3);
  padding-left: 5px;
  outline: 0;
  resize: none;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
}

form > button[type="submit"] {
  width: 60px;
  background-color: #2f6aff;
  color: white;
}

form > button[type="submit"]:hover {
  background-color: #2b53ba;
  cursor: pointer;
}

form > button[type="submit"]:disabled {
  background-color: grey;
}
</style>