<template>
  <workspace-secondary title="Thread" :subtitle="userChatName" @close="$emit('close')">
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
        <textarea
          v-model="newReplyMessage"
          placeholder="Reply..."
          @keyup.enter.exact="onSendReply"
        />
        <button type="submit" :disabled="!newReplyMessage">Reply</button>
      </form>
    </div>
  </workspace-secondary>
</template>

<script>
import WorkspaceSecondary from "./WorkspaceSecondary";
import MessageItem from "./MessageItem";
import { mapState } from "vuex";
import { event } from "../../../../config/constants";

export default {
  name: "WorkspaceUserChatSecondaryReplies",
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
      this.$socket.emit(event.REPLY_PERSONAL_MESSAGE, {
        text: this.newReplyMessage,
        receiver: this.threadMaster.userChat,
        sender: this.user,
        replyToMessageId: this.threadMaster.message.id
      });
      this.newReplyMessage = "";
    }
  },
  computed: {
    ...mapState(["currentChannel", "user"]),
    userChatName() {
      if (this.threadMaster) return this.threadMaster.userChat.name;
    }
  }
};
</script>

<style scoped>
#thread-view {
  padding: 10px;
  width: 100%;
  height: 100%;
}

#messages {
  width: 100%;
  overflow-y: scroll;
  height: auto;
}

.reply-message {
  padding-left: 15px;
}

form {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 10px 10px 0;
}

form > textarea {
  width: 100%;
  height: 30px;
  font-size: 0.9em;
  border: 1px solid rgba(30, 30, 30, 0.3);
  outline: 0;
  resize: none;
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