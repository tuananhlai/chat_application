<template>
  <workspace-secondary title="Thread" @close="$emit('close')">
    <div id="thread-view">
      <div v-if="threadMaster" id="messages">
        <message-item :message="threadMaster.message" />
        <message-item
          v-for="reply in threadMaster.message.replies"
          :key="reply.id"
          :message="reply"
          class="reply-message"
        />
      </div>
      <form @submit.prevent="onSendReply">
        <input type="text" v-model="newReplyMessage" placeholder="Reply..." />
        <button type="submit">Reply</button>
      </form>
    </div>
  </workspace-secondary>
</template>

<script>
import WorkspaceSecondary from "./WorkspaceSecondary";
import MessageItem from "./MessageItem";
import { mapState } from "vuex";
export default {
  name: "WorkspaceSecondaryReplies",
  components: { WorkspaceSecondary, MessageItem },
  props: {
    // Tin nhan dau tien cua thread
    threadMaster: {
      type: Object
    },
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      newReplyMessage: ""
    };
  },
  methods: {
    onSendReply() {
      console.log(this.threadMaster);
      this.$socket.emit("replyMessage", {
        text: this.newReplyMessage,
        room: this.currentChannel,
        sender: this.$store.state.user,
        replyToMessageId: this.threadMaster.message.id
      });
      this.newReplyMessage = "";
    }
  },
  sockets: {
    replyMessage(reply) {
      console.log(reply);
      this.$store.commit("addMessageReplies", {
        newReply: reply,
        threadMasterIndex: this.threadMaster.index
      });
    }
  },
  computed: {
    ...mapState(["currentChannel"])
  }
};
</script>

<style scoped>
#thread-view {
  padding: 10px;
  max-width: 250px;
  width: 100%;
}

#messages {
  overflow-y: scroll;
  width: 100%;
}

.reply-message {
  margin-left: 15px;
}

form {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0;
}

form > input[type="text"] {
  width: 100%;
  height: 30px;
  font-size: 1em;
  border: 1px solid rgba(30, 30, 30, 0.3);
  padding-left: 5px;
  outline: 0;
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