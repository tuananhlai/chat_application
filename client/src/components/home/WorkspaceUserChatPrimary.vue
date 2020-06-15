<template>
  <div id="workspace-primary">
    <div id="messages">
      <message-item
        v-for="(message) in getCurrentUserChatMessages"
        :key="message.id"
        :message="message"
        @showReply="$emit('showReply', { message, userChat: currentChannel })"
      />
    </div>
    <form @submit.prevent="onSendMessage">
      <upload-file-dialog
        :attachment="attachment"
        @selected="onSelectedAttachment"
        @deselected="attachment = null"
      />
      <textarea id="send-message" v-model="newMessage" placeholder="Message..." rows="2" />
      <button
        title="Send message."
        type="submit"
        id="send-button"
        :disabled="!newMessage && !attachment"
      >
        <i class="fas fa-paper-plane"></i>
      </button>
    </form>
  </div>
</template>

<script>
import MessageItem from "./MessageItem";
import UploadFileDialog from "./UploadFileDialog";
import { event } from "../../../../config/constants";
import { mapState, mapGetters } from "vuex";
import { uploadAttachment } from "../../lib/message";

export default {
  name: "WorkspaceUserChatPrimary",
  data() {
    return {
      newMessage: "",
      attachment: null
    };
  },
  components: { MessageItem, UploadFileDialog },
  methods: {
    onSelectedAttachment(attachment) {
      this.attachment = attachment;
    },
    async onSendMessage() {
      let res = await uploadAttachment(this.attachment);
      let msgAttachment = null;
      if (res && res.status === 200) msgAttachment = res.data.data;

      this.$socket.emit(event.PERSONAL_MESSAGE, {
        text: this.newMessage,
        receiver: this.currentChannel, // currentChannel is currentUserChat :( srry
        sender: this.user,
        attachment: msgAttachment
      });
      this.newMessage = "";
      this.attachment = null;
    }
  },
  computed: {
    ...mapState(["user", "currentChannel"]),
    ...mapGetters(["getCurrentUserChatMessages"])
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